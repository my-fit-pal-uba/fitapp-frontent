import { DevUrl } from "../env/dev.url.model";
import axios from "axios";

export async function registerProfile(
  user_id: number,
  role: string,
) {
  try {
    // Usando Axios como cliente HTTP en lugar de fetch

    const response = await axios.post(`${DevUrl.baseUrl}/access/signup`, {
      user_id: user_id,
      role: role,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return null
  }
}
