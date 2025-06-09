import { useEffect } from "react";
import Header from "../components/header";
import { getDishes } from "../services/nutrition.services";
import { Dish } from "../Models/dish";


import { useState } from "react";

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
            <div className="nutrition-container">
                <div className="table-wrapper">
                </div>
            </div>
        </>
    );
}

export default Nutrition;