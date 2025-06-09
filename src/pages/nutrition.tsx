import { useEffect } from "react";
import Header from "../components/header";
import { getDishes } from "../services/nutrition.services";
import { Dish } from "../Models/dish";


import { useState } from "react";
import NutritionTable from "../components/nutritiontable";

const Nutrition = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);

    useEffect(() => {
        const fetchDishes = async () => {
            const data = await getDishes();
            console.table(data)
            setDishes(data);
        };
        fetchDishes();
    }, []); 
    

    return (
        <>
            <Header />
            <h1 className="nutrition-title">Alimentacion</h1>
            <div className="nutrition-container">
                <div className="table-wrapper">
                    <NutritionTable data={dishes}  />
                </div>
            </div>
        </>
    );
}

export default Nutrition;