import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report


df = pd.read_csv("data/synthetic_data.csv")

features = [
    "transaction_amount",
    "transaction_count",
    "complaint_count",
    "latitude",
    "longitude",
    "location_risk",
    "withdrawal_distance",
    "withdrawal_hour",
    "previous_cases",
]

X = df[features]
y = df["hotspot"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y,
)

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("Model trained successfully.")
print(f"Accuracy: {accuracy:.2f}")

print("\nClassification Report:")
print(classification_report(y_test, predictions))

joblib.dump(
    model,
    "ml/model/random_forest_model.pkl"
)

print("\nModel saved successfully.")