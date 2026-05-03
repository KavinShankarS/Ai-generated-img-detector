
import torch
from PIL import Image
from transformers import ViTForImageClassification
from torchvision import transforms

# Load model
model = ViTForImageClassification.from_pretrained(
    "google/vit-base-patch16-224",
    num_labels=2,
    ignore_mismatched_sizes=True,
    output_attentions=True
)
checkpoint = torch.load("smilingbudha2.pth", map_location="cpu", weights_only=False)
model.load_state_dict(checkpoint["model_state_dict"])
model.eval()

# Load a test image — use any image in your backend folder
img = Image.open("test.jpg").convert("RGB")  # put any image named test.jpg in backend folder

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])
tensor = transform(img).unsqueeze(0)

# Test attention output
with torch.no_grad():
    outputs = model(tensor, output_attentions=True)

print("Output keys:", outputs.keys())
print("Attentions:", outputs.attentions)
print("Number of attention layers:", len(outputs.attentions) if outputs.attentions else "None")