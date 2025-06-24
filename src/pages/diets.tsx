import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/header";
import { getDiets, createDiet } from "../services/diets.services";
import { Diet } from "../Models/diet";
import "./diets.css";
import DietsTable from "../components/dietstable";
import { User } from '../Models/user';
import { DietRegistrationModal } from "../components/dietregistrationmodal";
import { getToken } from "../Models/token";
import { getDishCategories } from "../services/nutrition.services";
import { MealCategory } from "../Models/meal_categorie";

const Diets = () => {
    const [diets, setDiets] = useState<Diet[]>([]);
    const [allDiets, setAllDiets] = useState<Diet[]>([]);
    const [selectedDiet, setSelectedDiet] = useState<Diet | null>(null);
    const [isNewDietModalOpen, setIsNewDietModalOpen] = useState(false);
    const [categories, setCategories] = useState<MealCategory[]>([]);
    const user: User | null = getToken();
    const userId = user?.user_id;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiets = async () => {
            if (!userId) return;
            const data = await getDiets(userId);

            // Mapeo de platos para que coincidan con la interfaz Dish
            const mappedDiets = data.map((diet: any) => ({
                ...diet,
                dishes: (diet.dishes || []).map((dish: any) => ({
                    id: dish.dish_id,
                    name: dish.dish_name,
                    description: dish.dish_description,
                    calories: dish.calories,
                    carbs: dish.carbs,
                    fats: dish.fat,
                    proteins: dish.proteins,
                    weight: dish.weight_in_g,
                    id_dish_category: [], // o el valor correcto si lo tienes
                    meal_category_id: dish.meal_category_id,
                    serving_size_g: dish.serving_size_g,
                })),
            }));

            setAllDiets(mappedDiets);
            setDiets(mappedDiets);
        };

        fetchDiets();
    }, [userId]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getDishCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleRegisterNewDiet = async (newDiet: Diet) => {
        try {
            if (!userId) return;
            const result = await createDiet(newDiet, userId);
            const updatedDiets = await getDiets(userId);

            // Mapeo también al registrar una nueva dieta
            const mappedDiets = updatedDiets.map((diet: any) => ({
                ...diet,
                dishes: (diet.dishes || []).map((dish: any) => ({
                    id: dish.dish_id,
                    name: dish.dish_name,
                    description: dish.dish_description,
                    calories: dish.calories,
                    carbs: dish.carbs,
                    fats: dish.fat,
                    proteins: dish.proteins,
                    weight: dish.weight_in_g,
                    id_dish_category: [],
                    meal_category_id: dish.meal_category_id,
                    serving_size_g: dish.serving_size_g,
                })),
            }));

            setAllDiets(mappedDiets);
            setDiets(mappedDiets);
            setIsNewDietModalOpen(false);
        } catch (error) {
            console.error("Error al registrar nueva dieta:", error);
        }
    };

    // Redirige a la página para agregar plato a la dieta seleccionada
    const handleAddToDiet = (item: Diet) => {
        navigate(`/diet/${item.id}/add-dish`);
    };

    return (
        <div className="diet-app">
            <Header />
            <div className="content-wrapper">
                <main className="diet-main">
                    <div className="title-section">
                        <h1 className="diet-title">
                            <span className="title-icon">📋</span>
                            Dietas Alimenticias
                        </h1>
                    </div>

                    <div className="table-section">
                        <button
                            className="add-new-diet-button"
                            onClick={() => setIsNewDietModalOpen(true)}
                        >
                            + Nueva Dieta
                        </button>
                        <DietsTable
                            data={diets}
                            onAddToDiet={handleAddToDiet}
                            categories={categories}
                        />
                    </div>

                    <DietRegistrationModal
                        isOpen={isNewDietModalOpen}
                        onClose={() => setIsNewDietModalOpen(false)}
                        onRegistrar={handleRegisterNewDiet}
                    />
                </main>
            </div>
        </div>
    );
};

export default Diets;