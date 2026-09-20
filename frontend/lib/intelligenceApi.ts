const API_BASE_URL = "http://127.0.0.1:8000";

export type IntelligenceRequest = {
  location: string;
  risk_score: number;
  risk_level: string;
  hotspot: boolean;
  transaction_amount: number;
  complaint_count: number;
  withdrawal_hour: number;
  previous_cases: number;
};

export type IntelligenceResponse = {
  location: string;
  risk_score: number;
  risk_level: string;
  priority: string;
  hotspot: boolean;
  recommended_action: string;
  intelligence: string;
};

export async function generateIntelligence(
  data: IntelligenceRequest
): Promise<IntelligenceResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/intelligence/generate`,
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
      `Intelligence API request failed: ${response.status}`
    );
  }

  return response.json();
}