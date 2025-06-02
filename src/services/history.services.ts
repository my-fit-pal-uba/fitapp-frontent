import { DevUrl } from "../env/dev.url.model";
import { calories } from "../Models/calories";
import { ChartValue } from "../Models/chartValues";

export async function getCaloriesHistory() {
    try {
        const response = await fetch(`${DevUrl.baseUrl}/history/calories_history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
    
        if (!response.ok) {
        throw new Error("Network response was not ok");
        }
    
        const data: calories[] = await response.json();
        console.table(data);
        const chartData: ChartValue[] = data.map(item => {
            return {
                name: item.date,
                value: item.calories
            };
        });
        console.table(chartData);
        return chartData; 
    } catch (error) {
        console.error("Error fetching calories history:", error);
        return [];
    }
}


export async function getWeightHistory() {
    try {
        const response = await fetch(`${DevUrl.baseUrl}/history/weight_history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
    
        if (!response.ok) {
        throw new Error("Network response was not ok");
        }
    
        const data: calories[] = await response.json();
        const chartData: ChartValue[] = data.map(item => {
            return {
                name: item.date,
                value: item.calories
            };
        });
        
        return chartData; 
    } catch (error) {
        console.error("Error fetching calories history:", error);
        return [];
    }
}

