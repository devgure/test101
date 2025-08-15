# ai/FastAPI/main.py
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

model = joblib.load("/app/matcher/vectorizer.pkl")

class MatchRequest(BaseModel):
    bio: str

@app.post("/match")
async def predict(req: MatchRequest):
    vec = model.transform([req.bio])
    score = np.random.rand()  # Replace with real logic
    return {"score": float(score)}