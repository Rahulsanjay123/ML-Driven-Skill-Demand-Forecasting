from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

# -----------------------------
# Initialize Flask
# -----------------------------

app = Flask(__name__)
CORS(app)

# -----------------------------
# Load ML Model (Robust paths for deployment)
# -----------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "skill_model.pkl")
encoder_path = os.path.join(BASE_DIR, "skill_encoder.pkl")

model = joblib.load(model_path)
encoder = joblib.load(encoder_path)

print("ML Model Loaded Successfully")

# -----------------------------
# Home Route
# -----------------------------

@app.route("/")
def home():
    return jsonify({
        "message": "Skill Forecasting ML API Running"
    })


# -----------------------------
# Prediction Route
# -----------------------------

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json
    print(f"--- ML Service Request ---")
    print(f"Data: {data}")

    skill = data.get("skill")
    job_postings = data.get("job_postings")
    avg_salary = data.get("avg_salary")
    growth_rate = data.get("growth_rate")
    difficulty = data.get("difficulty")
    learning_months = data.get("learning_months")

    try:

        # Encode skill (case-insensitive)
        skill_lower = skill.lower() if skill else ""
        
        try:
            skill_encoded = encoder.transform([skill_lower])[0]
        except ValueError:
            # Fallback for unknown skill - use a generic encoding or mean value if possible
            skill_encoded = 0 
            print(f"Warning: Skill '{skill}' not in encoder. Using 0.")

        # Create feature array with defaults if missing
        features = np.array([[
            skill_encoded,
            float(job_postings) if job_postings is not None else 5000,
            float(avg_salary) if avg_salary is not None else 80000,
            float(growth_rate) if growth_rate is not None else 10,
            float(difficulty) if difficulty is not None else 5,
            float(learning_months) if learning_months is not None else 6
        ]])

        # Predict demand score
        prediction = model.predict(features)[0]
        prediction = max(0, min(100, prediction)) # Clamp between 0-100

        # Convert score to category
        if prediction >= 80:
            category = "Very High Demand"
        elif prediction >= 60:
            category = "High Demand"
        elif prediction >= 40:
            category = "Medium Demand"
        else:
            category = "Low Demand"

        response = {
            "skill": skill,
            "demand_score": round(float(prediction), 2),
            "future_scope": category,
            "status": "success"
        }
        print(f"Result: {response}")
        return jsonify(response)

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({
            "error": "Internal prediction error",
            "message": str(e),
            "status": "error"
        }), 500


# -----------------------------
# Run Server
# -----------------------------

if __name__ == "__main__":
    # Use the port assigned by the backend server, default to 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(
        host="0.0.0.0",
        port=port,
        debug=True
    )