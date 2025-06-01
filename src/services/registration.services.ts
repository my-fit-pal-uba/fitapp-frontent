import { DevUrl } from "../env/dev.url.model";

export async function registerProfile(
  user_id: number,
  role: string,
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
