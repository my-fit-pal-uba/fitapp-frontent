import { DevUrl } from "../env/dev.url.model";

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
    
        const data = await response.json();
        console.table(data);
        return data; 
    } catch (error) {
        console.error("Error fetching calories history:", error);
        return [];
    }
}