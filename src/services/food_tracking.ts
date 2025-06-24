import { DevUrl } from "../env/dev.url.model";
import { TrackingHistory } from "../Models/tracking_history";

export async function getTrackingHistory(user_id: number) {
  try {
    const response = await fetch(
      `${DevUrl.baseUrl}/history/all_history?user_id=${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const trackingHistory: TrackingHistory[] = data.message;
    return trackingHistory;
  } catch (error) {
    return [];
  }
}
