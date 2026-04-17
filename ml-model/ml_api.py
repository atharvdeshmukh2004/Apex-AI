# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# import pandas as pd
# import joblib

# app = FastAPI()

# # Enable CORS (important for React frontend)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load ML model and encoders
# model = joblib.load("career_model.pkl")
# encoders = joblib.load("encoders.pkl")


# @app.get("/")
# def home():
#     return {"message": "Career Guidance ML API is running"}


# @app.post("/predict")
# def predict(data: dict):

#     try:
#         # Convert input data to dataframe
#         df = pd.DataFrame([data])

#         # Encode categorical columns
#         for col in df.columns:
#             if col in encoders:
#                 df[col] = encoders[col].transform(df[col])

#         # Get prediction probabilities
#         probabilities = model.predict_proba(df)[0]

#         # Get career labels
#         careers = model.classes_

#         # Combine careers with probabilities
#         results = []
#         for career, prob in zip(careers, probabilities):
#             results.append({
#                 "career": career,
#                 "confidence": round(prob * 100, 2)
#             })

#         # Sort by highest confidence
#         results = sorted(results, key=lambda x: x["confidence"], reverse=True)

#         # Return top 3 recommendations
#         return {
#             "recommendations": results[:3]
#         }

#     except Exception as e:
#         return {
#             "error": str(e)
#         }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model    = joblib.load("career_model.pkl")
encoders = joblib.load("encoders.pkl")

INTERESTS = [
    "technology", "design", "business", "healthcare", "finance", "law",
    "education", "research", "arts", "media", "sports", "environment",
    "social", "government",
]
SKILLS = [
    "coding", "math", "writing", "drawing", "speaking", "data",
    "pm", "research", "teaching", "marketing",
]

def safe_encode(encoder, value):
    val = str(value).strip()
    if val not in encoder.classes_:
        fallback = encoder.classes_[0]
        print(f"  Unseen value '{val[:40]}' in col → using '{fallback}'")
        val = fallback
    return int(encoder.transform([val])[0])


@app.get("/")
def home():
    return {"message": "Career Guidance ML API is running"}


@app.post("/predict")
def predict(data: dict):
    try:
        row = {}

        # ── Numeric ───────────────────────────────────────────────────────────
        row["percentage_score"] = float(data.get("percentage_score", 75))

        # ── Categorical ───────────────────────────────────────────────────────
        row["education_level"]     = safe_encode(encoders["education_level"],     data.get("education_level",     "12"))
        row["stream"]              = safe_encode(encoders["stream"],              data.get("stream",              ""))
        row["learning_style"]      = safe_encode(encoders["learning_style"],      data.get("learning_style",      "hands-on"))
        row["work_preference"]     = safe_encode(encoders["work_preference"],     data.get("work_preference",     "office"))
        row["risk_appetite"]       = safe_encode(encoders["risk_appetite"],       data.get("risk_appetite",       "medium"))
        row["location_preference"] = safe_encode(encoders["location_preference"], data.get("location_preference", "national"))

        # ── Interests → binary ────────────────────────────────────────────────
        top_interests = data.get("top_interests", [])
        for interest in INTERESTS:
            row[f"interest_{interest}"] = 1 if interest in top_interests else 0

        # ── Technical skills → binary ─────────────────────────────────────────
        technical_skills = data.get("technical_skills", [])
        for skill in SKILLS:
            row[f"skill_{skill}"] = 1 if skill in technical_skills else 0

        # ── Soft skills → flat numeric ────────────────────────────────────────
        soft = data.get("soft_skills", {})
        row["soft_communication"] = int(soft.get("communication", 3))
        row["soft_leadership"]    = int(soft.get("leadership",    3))
        row["soft_teamwork"]      = int(soft.get("teamwork",      3))
        row["soft_analytical"]    = int(soft.get("analytical",    3))
        row["soft_creative"]      = int(soft.get("creative",      3))

        # ── Build dataframe in exact training feature order ───────────────────
        feature_order = list(model.feature_names_in_)
        df = pd.DataFrame([row])[feature_order]

        # ── Predict ───────────────────────────────────────────────────────────
        probabilities = model.predict_proba(df)[0]
        careers = encoders["career_cluster"].classes_

        results = sorted(
            [{"career": str(c), "confidence": round(float(p) * 100, 2)}
             for c, p in zip(careers, probabilities)],
            key=lambda x: x["confidence"],
            reverse=True,
        )

        return {"recommendations": results[:3]}

    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}