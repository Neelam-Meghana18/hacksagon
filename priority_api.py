# # priority_api.py

# from flask import Flask, request, jsonify
# import joblib
# import numpy as np

# app = Flask(__name__)

# # Load the trained model
# model = joblib.load("priority_model.pkl")

# @app.route("/predict", methods=["POST"])
# def predict_priority():
#     data = request.get_json()
#     try:
#         age = int(data["age"])
#         emergency = 1 if str(data["emergency"]).lower() == "yes" or data["emergency"] == 1 else 0
#         sentiment_score = float(data["sentimentScore"])
#         rarity_score = float(data["rarityScore"])

#         features = np.array([[age, emergency, sentiment_score, rarity_score]])
#         score = model.predict(features)[0]
        

#         return jsonify({"priorityScore":score})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# if __name__ == "__main__":
#     app.run(port=8000, debug=True)



# priority_api.py

from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load("priority_model.pkl")

@app.route("/predict", methods=["POST"])
def predict_priority():
    data = request.get_json()
    try:
        age = int(data["age"])
        emergency = 1 if str(data["emergency"]).lower() == "yes" or data["emergency"] == 1 else 0
        sentiment_score = float(data["sentimentScore"])
        rarity_score = float(data["rarityScore"])

        features = np.array([[age, emergency, sentiment_score, rarity_score]])
        raw_score = model.predict(features)[0]

        # ✅ Normalize to 0–1 range (assuming max raw score = 100)
        normalized_score = max(0, min(raw_score / 100, 1.0))

        return jsonify({"priorityScore": round(normalized_score, 4)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(port=8000, debug=True)
