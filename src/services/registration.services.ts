import { DevUrl } from "../env/dev.url.model";
import { Rol } from "../Models/rol";

export async function registerProfile(
  user_id: number,
  rol_id: number,
) {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/profiles/post_user_rol`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        rol_id: rol_id,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return true;
  } catch (error) {
    return true;
  }
}


export async function getUserRols(){
  try {
    const response = await fetch(`${DevUrl.baseUrl}/profiles/get_user_rols`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.message as Rol[]; 
  } catch (error) {
    console.error("Error fetching user roles:", error);
    return [];
  }
}

export async function postWeight(user_id: number, weight: number) {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/profiles/post_daily_weight`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        weight: weight,
      }),
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error posting weight:", error);
    return false;
  }
}


export async function postCalories(user_id: number, calories: number) {
  try {

    const response = await fetch(`${DevUrl.baseUrl}/profiles/post_daily_calories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        calories: calories,
      }),
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error posting weight:", error);
    return false;
  }
}