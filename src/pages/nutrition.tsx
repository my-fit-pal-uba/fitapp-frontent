import { useEffect } from "react";
import Header from "../components/header";
import { getDishCategories, getDishes } from "../services/nutrition.services";
import { Dish } from "../Models/dish";
import "./nutrition.css";

import { useState } from "react";
import NutritionTable from "../components/nutritiontable";
import { MealCategory } from "../Models/meal_categorie";

const Nutrition = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [categories, setCategories] = useState<MealCategory[]>([]);

    useEffect(() => {
        const fetchDishes = async () => {
            const data = await getDishes();
            setDishes(data);
        };

        const fetchDishCategories = async () => {
            const categories = await getDishCategories();
            console.table(categories);
            setCategories(categories);
        }

        fetchDishes();
        fetchDishCategories();
    }, []);


    return (
        <>
            <Header />
            <h1 className="nutrition-title">Alimentacion</h1>
            <div className="category-filter">
                <h3 className="filter-title">Filtrar por categoría:</h3>
                <div className="category-buttons">
                    <button className="category-button active">Todas</button>
                    {categories.slice(0, 5).map((category) => (
                        <button
                            key={category.id}
                            className="category-button"
                        >
                            {category.description}
                        </button>
                    ))}
                </div>
            </div>
            <div className="nutrition-container">
                <div className="table-wrapper">
                    <NutritionTable data={dishes} />
                </div>
            </div>
        </>
    );
}

export default Nutrition;