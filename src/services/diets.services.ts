import { DevUrl } from "../env/dev.url.model";
import { Diet } from "../Models/diet";
import { DishToDiet } from "../Models/dish_to_diet";

export async function getDiets(user_id: number) {
  const response = await fetch(`${DevUrl.baseUrl}/diet/get_diets?user_id=${user_id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (!data.response) {
    return [];
  }
  return data.message;
}

export async function createDiet(newDiet: Diet, user_id: number) {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/diet/create_diet?user_id=${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDiet),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return true;
  } catch (error) {
    console.error("Error posting diet:", error);
    return false;
  }
}

export async function addDish(dish: DishToDiet, diet_id: number) {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/diet/add_dish?diet_id=${diet_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dish),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return true;
  } catch (error) {
    console.error("Error posting new dish:", error);
    return false;
  }
}
