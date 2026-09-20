const API_BASE_URL = "http://127.0.0.1:8000";

export type HotspotLocation = {
  location: string;
  latitude: number;
  longitude: number;
  risk_score: number;
  risk_level: string;
  hotspot: boolean;
};

export type HotspotRequest = {
  transaction_amount: number;
  transaction_count: number;
  complaint_count: number;
  location_risk: number;
  withdrawal_distance: number;
  withdrawal_hour: number;
  previous_cases: number;
};

export type HotspotResponse = {
  locations: HotspotLocation[];
};

export async function predictHotspots(
  data: HotspotRequest
): Promise<HotspotResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/hotspots/predict`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Hotspot API request failed: ${response.status}`
    );
  }

  return response.json();
}