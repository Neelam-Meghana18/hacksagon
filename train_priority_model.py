# train_priority_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score
import joblib

# Load dataset
df = pd.read_csv("blood_request_dataset.csv")

# Features and label
X = df[["age", "emergency", "sentimentScore", "rarityScore"]]
y = df["priorityScore"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
print("R² score:", r2_score(y_test, predictions))

# Save model
joblib.dump(model, "priority_model.pkl")
print("✅ Model saved as 'priority_model.pkl'")
