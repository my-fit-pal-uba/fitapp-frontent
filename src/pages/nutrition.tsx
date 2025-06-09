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
            <div className="nutrition-app">
                <Header />
                <div className="content-wrapper">
                    <main className="nutrition-main">
                        <div className="title-section">
                            <h1 className="nutrition-title">
                                <span className="title-icon">🍏</span>
                                Alimentación Saludable
                            </h1>
                        </div>

                        <div className="category-filter-section">
                            <div className="category-filter">
                                <h3 className="filter-title">Filtrar por categoría:</h3>
                                <div className="category-buttons">
                                    <button className="category-button active">Todas</button>
                                    {categories.slice(0, 5).map((category) => (
                                        <button key={category.id} className="category-button">
                                            {category.description}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="table-section">
                            <NutritionTable data={dishes} />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Nutrition;