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
