import { DevUrl } from "../env/dev.url.model";
import { Diet } from "../Models/diet";

export async function getDiets() {
  const response = await fetch("http://localhost:8080/nutrition/get_diets");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (!data.response) {
    return [];
  }
  return data.message;
}

export async function createDiet(newDiet: Diet) {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/nutrition/create_diet`, {
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

export async function addDish(diet: Diet) {
  try {
    const response = await fetch(`${DevUrl.baseUrl}/nutrition/add_dish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diet),
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
