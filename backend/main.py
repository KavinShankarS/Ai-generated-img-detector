from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from io import BytesIO
import torch
from inference import load_model, predict

app = FastAPI()

# Allow React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once at startup
DEVICE     = "cuda" if torch.cuda.is_available() else "cpu"
MODEL_PATH = "smilingbudha2.pth"
model      = load_model(MODEL_PATH, DEVICE)
print(f"Model loaded on {DEVICE}")

@app.get("/")
def root():
    return {"status": "AI Detector API is running"}

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    contents = await file.read()
    image    = Image.open(BytesIO(contents))

    prediction, display_text, emoji, confidence, fake_score, real_score, properties, heatmap = predict(model, image, DEVICE)

    return {
        "prediction":   prediction,
        "display_text": display_text,
        "emoji":        emoji,
        "confidence":   round(confidence, 2),
        "fake_score":   round(fake_score, 2),
        "real_score":   round(real_score, 2),
        "filename":     file.filename,
        "properties":   properties,
        "heatmap":      heatmap
    }

@app.post("/compare")
async def compare_images(
    file1: UploadFile = File(...),
    file2: UploadFile = File(...)
):
    contents1 = await file1.read()
    contents2 = await file2.read()
    image1    = Image.open(BytesIO(contents1))
    image2    = Image.open(BytesIO(contents2))

    pred1, text1, emoji1, conf1, fake1, real1, props1, heatmap1 = predict(model, image1, DEVICE)
    pred2, text2, emoji2, conf2, fake2, real2, props2, heatmap2 = predict(model, image2, DEVICE)

    return {
        "image1": {
            "prediction":   pred1,
            "display_text": text1,
            "emoji":        emoji1,
            "confidence":   round(conf1, 2),
            "fake_score":   round(fake1, 2),
            "real_score":   round(real1, 2),
            "filename":     file1.filename,
            "properties":   props1,
            "heatmap":      heatmap1
        },
        "image2": {
            "prediction":   pred2,
            "display_text": text2,
            "emoji":        emoji2,
            "confidence":   round(conf2, 2),
            "fake_score":   round(fake2, 2),
            "real_score":   round(real2, 2),
            "filename":     file2.filename,
            "properties":   props2,
            "heatmap":      heatmap2
        }
    }
