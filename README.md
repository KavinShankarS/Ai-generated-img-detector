# AI-Generated Image Detection System

A full-stack web application that detects whether an image is AI-generated or real, 
using a fine-tuned Vision Transformer (ViT) model with attention heatmap visualization.

## Overview

This system classifies images as AI-generated or authentic with around 94% accuracy. 
It also provides visual explainability through attention heatmaps, showing which regions 
of the image influenced the model's prediction.

## Tech Stack

| Layer | Technology |
|-------|------------|
| ML Model | Vision Transformer (ViT-Base-Patch16-224) |
| Training Data | MS COCO + Defactify Dataset |
| Backend | Python, FastAPI |
| Frontend | React.js, Vite |
| Visualization | Attention Heatmaps |

## Features

- Upload an image and get a prediction — real or AI-generated
- Attention heatmap overlay to visualize model focus areas
- REST API with `/analyze` and `/compare` endpoints
- Dark and light theme toggle
- Clean separation between frontend and backend

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend/react
npm install
npm run dev
```

## Model Details

The model is a fine-tuned ViT-Base-Patch16-224 trained on a combination of MS COCO 
(real images) and the Defactify dataset (AI-generated images), achieving around 94% 
classification accuracy.

## Project Structure
