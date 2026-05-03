# AI-Generated Image Detection System

A full-stack web application that detects whether an image is AI-generated or real, using a fine-tuned Vision Transformer (ViT) model with attention heatmap visualization.

## 🔍 Overview

This system classifies images as **AI-generated or authentic** with ~94% accuracy. It provides visual explainability through attention heatmaps, helping users understand what regions of the image influenced the prediction.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| ML Model | Vision Transformer (ViT-Base-Patch16-224) |
| Training Data | MS COCO + Defactify Dataset |
| Backend | Python, FastAPI |
| Frontend | React.js, Vite |
| Visualization | Attention Heatmaps |

## ⚙️ Features

- Upload an image and get a real vs AI-generated prediction
- Attention heatmap overlay showing model focus areas
- `/analyze` endpoint for single image classification
- `/compare` endpoint for side-by-side comparison
- Dark / Light theme toggle
- REST API based frontend–backend communication

## 🚀 Getting Started

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

## 📊 Model Performance

- **Accuracy:** ~94%
- **Architecture:** ViT-Base-Patch16-224 (fine-tuned)
- **Datasets:** MS COCO (real images), Defactify (AI-generated images)

## 📁 Project Structure

├── backend/
│   ├── inference.py
│   ├── main.py
│   ├── test_heatmap.py   ← optional
│   └── requirements.txt
├── frontend/
│   └── react/
│       ├── src/
│       ├── public/
│       ├── .gitignore
│       └── package.json
└── README.md

## ⚠️ Note

Model weights are not included in this repository due to file size. Training was done on Google Colab using GPU acceleration.