import { DevUrl } from "../env/dev.url.model";
import { Dish } from "../Models/dish";

export async function getDishes() {
  const response = await fetch("http://localhost:8080/nutrition/get_dishes");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (!data.response) {
    return [];
  }
  return data.message;
}

export async function getDishCategories() {
  const response = await fetch(
    "http://localhost:8080/nutrition/get_meal_categories"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (!data.response) {
    return [];
  }
  return data.message;
}

export async function registerDishConsumption(
  dishId: number,
  user_id: number,
  quantity: number
) {
  const response = await fetch(
    "http://localhost:8080/nutrition/post_dish_consumption",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dish_id: dishId,
        user_id: user_id,
        weight: quantity,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}



export async function postDish(newDish: Dish) {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/nutrition/post_dish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDish),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return true;
  } catch (error) {
    console.error("Error posting dish:", error);
    return false;
  }
}