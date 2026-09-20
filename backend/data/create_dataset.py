import random
import pandas as pd

random.seed(42)

fraud_types = [
    "UPI Fraud",
    "Phishing",
    "Investment Fraud",
    "Identity Theft",
    "Online Shopping Fraud",
]

locations = [
    ("Pune", 18.5204, 73.8567),
    ("Mumbai", 19.0760, 72.8777),
    ("Nagpur", 21.1458, 79.0882),
    ("Nashik", 19.9975, 73.7898),
    ("Thane", 19.2183, 72.9781),
    ("Kolhapur", 16.7050, 74.2433),
    ("Aurangabad", 19.8762, 75.3433),
]

records = []

for i in range(2000):
    location, latitude, longitude = random.choice(locations)

    transaction_amount = random.randint(500, 100000)
    transaction_count = random.randint(1, 15)
    complaint_count = random.randint(1, 20)
    location_risk = round(random.uniform(0, 1), 2)
    withdrawal_distance = round(random.uniform(0.5, 50), 2)
    withdrawal_hour = random.randint(0, 23)
    previous_cases = random.randint(0, 15)

    risk = (
        location_risk * 40
        + min(transaction_count / 15, 1) * 15
        + min(complaint_count / 20, 1) * 15
        + min(previous_cases / 15, 1) * 10
        + (1 if withdrawal_hour < 6 or withdrawal_hour > 22 else 0) * 10
        + (1 if withdrawal_distance < 5 else 0) * 10
    )

    hotspot = 1 if risk >= 55 else 0

    records.append(
        {
            "complaint_id": f"CP-{i + 1:05d}",
            "fraud_type": random.choice(fraud_types),
            "transaction_amount": transaction_amount,
            "transaction_count": transaction_count,
            "complaint_count": complaint_count,
            "location": location,
            "latitude": latitude,
            "longitude": longitude,
            "location_risk": location_risk,
            "withdrawal_distance": withdrawal_distance,
            "withdrawal_hour": withdrawal_hour,
            "previous_cases": previous_cases,
            "hotspot": hotspot,
        }
    )

df = pd.DataFrame(records)

df.to_csv("data/synthetic_data.csv", index=False)

print("Dataset created successfully.")
print(f"Total records: {len(df)}")
print(f"Hotspots: {df['hotspot'].sum()}")
print(f"Non-hotspots: {(df['hotspot'] == 0).sum()}")
print(f"Locations: {df['location'].nunique()}")
print("\nDataset columns:")
print(df.columns.tolist())