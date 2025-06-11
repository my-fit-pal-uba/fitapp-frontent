import { useEffect, useState } from "react";
import Header from "../components/header";
import { getDishCategories, getDishes, postDish, registerDishConsumption } from "../services/nutrition.services";
import { Dish } from "../Models/dish";
import "./nutrition.css";
import NutritionTable from "../components/nutritiontable";
import { MealCategory } from "../Models/meal_categorie";
import { MealRegistrationModal } from "../components/mealregistrationmodal";
import { getToken } from "../Models/token";
import NewDishModal from "../components/modalnuevoplato";

const Nutrition = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [allDishes, setAllDishes] = useState<Dish[]>([]);
    const [categories, setCategories] = useState<MealCategory[]>([]);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewDishModalOpen, setIsNewDishModalOpen] = useState(false);

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

    const handleRegisterMeal = (quantity: number) => {
        const userToken = getToken();
        if (!userToken || !selectedDish) {
            console.error("User token is not available.");
            return;
        }
        const user_id = userToken.user_id ?? 0;
        const dish_id = selectedDish.id ?? 0;
        registerDishConsumption(dish_id, user_id, quantity)
    };


    const handleRegisterNewDish = async (newDish: Dish) => {
        try {
            const result = await postDish(newDish);
            const updatedDishes = await getDishes();
            setAllDishes(updatedDishes);
            setDishes(updatedDishes);
            setIsNewDishModalOpen(false);
        } catch (error) {
            console.error("Error al registrar nuevo alimento:", error);
        }
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
                            <button
                                className="add-new-food-button"
                                onClick={() => setIsNewDishModalOpen(true)}
                            >
                                + Nuevo Alimento
                            </button>
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

                    <NewDishModal
                        isOpen={isNewDishModalOpen}
                        onClose={() => setIsNewDishModalOpen(false)}
                        onRegistrar={handleRegisterNewDish}
                        meal_categories={categories}
                    />
                </main>
            </div>
        </div >
    );
}

export default Nutrition;