import { DevUrl } from "../env/dev.url.model";
import { Rol } from "../Models/rol";

export async function registerProfile(
  user_id: number,
  role: number,
) {
  try {
    // const response = await axios.post(`${DevUrl.baseUrl}/access/signup`, {
    //   user_id: user_id,
    //   role: role,
    // }, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // // return response;
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
