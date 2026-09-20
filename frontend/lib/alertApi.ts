const API_BASE_URL = "http://127.0.0.1:8000";

export type AlertRequest = {
  location: string;
  risk_score: number;
  risk_level: string;
  hotspot: boolean;
};

export type AlertResponse = {
  alert_id: string;
  location: string;
  risk_score: number;
  risk_level: string;
  priority: string;
  alert_status: string;
  message: string;
  recommended_action: string;
  created_at: string;
};

export async function generateAlert(
  data: AlertRequest
): Promise<AlertResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/alerts/generate`,
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
      `Alert API request failed: ${response.status}`
    );
  }

  return response.json();
}