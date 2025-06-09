import { useEffect, useState } from "react";
import Header from "../components/header";
import { getDishCategories, getDishes } from "../services/nutrition.services";
import { Dish } from "../Models/dish";
import "./nutrition.css";
import NutritionTable from "../components/nutritiontable";
import { MealCategory } from "../Models/meal_categorie";
import { MealRegistrationModal } from "../components/mealregistrationmodal";

const Nutrition = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [allDishes, setAllDishes] = useState<Dish[]>([]);
    const [categories, setCategories] = useState<MealCategory[]>([]);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchDishes = async () => {
            const data = await getDishes();
            setAllDishes(data);
            setDishes(data);
        };

        const fetchDishCategories = async () => {
            const categories = await getDishCategories();
            setCategories(categories);
        }

        fetchDishes();
        fetchDishCategories();
    }, []);

    const handleCategoryFilter = (categoryId: number | null) => {
        setActiveCategory(categoryId);

        if (categoryId === null) {
            setDishes(allDishes);
        } else {
            const filteredDishes = allDishes.filter(dish =>
                dish.id_dish_category.includes(categoryId)
            );
            setDishes(filteredDishes);
        }
    };

    const handleAddToMeal = (item: Dish) => {
        setSelectedDish(item);
        setIsModalOpen(true);
    };

    const handleRegisterMeal = (quantity: number, date: Date) => {
        // Aquí implementas la lógica para registrar el consumo
        console.log(`Registrado: ${quantity}g de ${selectedDish?.name} a las ${date}`);
        // Puedes hacer una llamada API aquí para guardar en tu backend
    };


    return (
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
                                <button
                                    className={`category-button ${activeCategory === null ? 'active' : ''}`}
                                    onClick={() => handleCategoryFilter(null)}
                                >
                                    Todas
                                </button>
                                {categories.slice(0, 5).map((category) => (
                                    <button
                                        key={category.id}
                                        className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                                        onClick={() => handleCategoryFilter(category.id)}
                                    >
                                        {category.description}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="table-section">
                        <NutritionTable
                            data={dishes}
                            onAddToMeal={handleAddToMeal}
                        />
                    </div>

                    <MealRegistrationModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        dish={selectedDish}
                        onRegister={handleRegisterMeal}
                    />
                </main>
            </div>
        </div >
    );
}

export default Nutrition;