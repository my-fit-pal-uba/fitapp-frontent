import { DevUrl } from "../env/dev.url.model";
import { calories } from "../Models/calories";
import { ChartValue } from "../Models/chartValues";
import { Weight } from "../Models/weight";

export async function getCaloriesHistory(user_id: number) {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/history/calories_history?user_id=${user_id}`, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    let calories: calories[] = data.response;
    const chartData: ChartValue[] = calories.map((item) => {
      return {
        name: item.date,
        value: item.calories,
      };
    });
    return chartData;
  } catch (error) {
    console.error("Error fetching calories history:", error);
    return [];
  }
}

export async function getWeightHistory(user_id: number) {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/history/weight_history?user_id=${user_id}`, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    let weights: Weight[] = data.response;
    const chartData: ChartValue[] = weights.map((item) => {
      return {
      name: item.date,
      value: item.weight,
      };
    });
    return chartData;
    } catch (error) {
    console.error("Error fetching weight history:", error);
    return [];
  }
}
