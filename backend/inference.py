import torch
import cv2
import numpy as np
import base64
import io
from PIL import Image
from torchvision import transforms
from transformers import ViTForImageClassification

def load_model(model_path, device="cpu"):
    model = ViTForImageClassification.from_pretrained(
        "google/vit-base-patch16-224",
        num_labels=2,
        ignore_mismatched_sizes=True,
        output_attentions=True  # enable at config level
    )
    checkpoint = torch.load(model_path, map_location=device, weights_only=False)
    model.load_state_dict(checkpoint["model_state_dict"])
    model.eval()
    model.to(device)
    return model

def preprocess_image(image: Image.Image):
    transform = transforms.Compose([
        transforms.Resize((224, 224), interpolation=transforms.InterpolationMode.BICUBIC),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])
    image = image.convert("RGB")
    return transform(image).unsqueeze(0)

def generate_heatmap(model, image: Image.Image, device="cpu") -> str:
    try:
        tensor = preprocess_image(image).to(device)

        with torch.no_grad():
            outputs = model(tensor, output_attentions=True)

        # Get last layer attention
        attentions = outputs.attentions[-1]
        avg_attention = attentions[0].mean(dim=0)
        cls_attention = avg_attention[0, 1:]

        # Reshape to 14x14
        grid_size = int(cls_attention.shape[0] ** 0.5)
        attention_map = cls_attention.reshape(grid_size, grid_size).cpu().numpy()

        # Normalize
        attention_map = (attention_map - attention_map.min()) / (attention_map.max() - attention_map.min() + 1e-8)
        attention_map = (attention_map * 255).astype(np.uint8)

        # Resize to original image size
        orig_w, orig_h = image.size
        attention_resized = cv2.resize(attention_map, (orig_w, orig_h), interpolation=cv2.INTER_CUBIC)

        # Apply colormap
        heatmap_colored = cv2.applyColorMap(attention_resized, cv2.COLORMAP_JET)
        heatmap_colored = cv2.cvtColor(heatmap_colored, cv2.COLOR_BGR2RGB)

        # Blend with original
        orig_array = np.array(image.convert("RGB"))
        blended = cv2.addWeighted(orig_array, 0.55, heatmap_colored, 0.45, 0)

        # Convert to base64
        blended_pil = Image.fromarray(blended)
        buffer = io.BytesIO()
        blended_pil.save(buffer, format="JPEG", quality=85)
        buffer.seek(0)
        heatmap_b64 = base64.b64encode(buffer.read()).decode("utf-8")
        return f"data:image/jpeg;base64,{heatmap_b64}"

    except Exception as e:
        print(f"Heatmap generation failed: {e}")
        return None

def analyze_image_properties(image: Image.Image) -> dict:
    img_rgb = np.array(image.convert("RGB"))
    img_bgr = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2BGR)
    img_gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

    h, w = img_gray.shape
    quadrants = [
        img_gray[:h//2, :w//2],
        img_gray[:h//2, w//2:],
        img_gray[h//2:, :w//2],
        img_gray[h//2:, w//2:]
    ]
    quad_means = [np.mean(q) for q in quadrants]
    lighting_variance = np.std(quad_means)
    lighting_score = max(0, min(100, 100 - (lighting_variance * 2)))

    laplacian = cv2.Laplacian(img_gray, cv2.CV_64F)
    laplacian_var = laplacian.var()
    texture_score = max(0, min(100, 100 - min(laplacian_var / 5, 100)))

    edges = cv2.Canny(img_gray, 100, 200)
    edge_density = (np.sum(edges > 0) / (h * w)) * 100
    edge_score = max(0, min(100, edge_density * 3))

    color_stds = []
    for i in range(3):
        channel = img_rgb[:, :, i]
        color_stds.append(np.std(channel))
    avg_color_std = np.mean(color_stds)
    color_score = max(0, min(100, 100 - min(avg_color_std / 1.28, 100)))

    blurred = cv2.GaussianBlur(img_gray, (5, 5), 0)
    noise = img_gray.astype(float) - blurred.astype(float)
    noise_level = np.std(noise)
    noise_score = max(0, min(100, 100 - min(noise_level * 5, 100)))

    return {
        "lighting_consistency": round(lighting_score, 1),
        "texture_smoothness": round(texture_score, 1),
        "edge_sharpness": round(edge_score, 1),
        "color_distribution": round(color_score, 1),
        "noise_pattern": round(noise_score, 1),
    }

def predict(model, image: Image.Image, device="cpu"):
    tensor = preprocess_image(image).to(device)
    with torch.no_grad():
        outputs = model(tensor)
        logits  = outputs.logits if hasattr(outputs, "logits") else outputs
        probs   = torch.softmax(logits, dim=1)
        confidence, pred_idx = probs.max(dim=1)

    fake_score = probs[0][0].item() * 100
    real_score = probs[0][1].item() * 100
    confidence = confidence.item() * 100
    pred_idx   = pred_idx.item()

    properties = analyze_image_properties(image)
    heatmap    = generate_heatmap(model, image, device)

    if confidence < 60:
        prediction   = "UNCERTAIN"
        display_text = "Uncertain"
        emoji        = "?"
    elif pred_idx == 0:
        prediction   = "FAKE"
        display_text = "AI Generated"
        emoji        = "AI"
    else:
        prediction   = "REAL"
        display_text = "Real Image"
        emoji        = "REAL"

    return prediction, display_text, emoji, confidence, fake_score, real_score, properties, heatmap