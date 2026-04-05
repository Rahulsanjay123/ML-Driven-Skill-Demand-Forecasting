import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_squared_error

# -----------------------------
# 1 Load Dataset
# -----------------------------

data = pd.read_csv("dataset.csv")

print("Dataset Loaded")
print(data.head())

# -----------------------------
# 2 Encode Skill Column
# -----------------------------

# Make skills case-insensitive by lowercasing
data["skill"] = data["skill"].str.lower()

skill_encoder = LabelEncoder()
data["skill_encoded"] = skill_encoder.fit_transform(data["skill"])

# -----------------------------
# 3 Feature Selection
# -----------------------------

X = data[[
    "skill_encoded",
    "job_postings",
    "avg_salary",
    "growth_rate",
    "difficulty",
    "learning_months"
]]

y = data["demand_score"]

# -----------------------------
# 4 Train/Test Split
# -----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# -----------------------------
# 5 Train Model
# -----------------------------

model = RandomForestRegressor(
    n_estimators=200,
    random_state=42
)

model.fit(X_train, y_train)

print("Model Training Completed")

# -----------------------------
# 6 Evaluate Model
# -----------------------------

predictions = model.predict(X_test)

mse = mean_squared_error(y_test, predictions)

print("Model MSE:", mse)

# -----------------------------
# 7 Save Model
# -----------------------------

joblib.dump(model, "skill_model.pkl")
joblib.dump(skill_encoder, "skill_encoder.pkl")

print("Model saved as skill_model.pkl")
print("Encoder saved as skill_encoder.pkl")