import { useEffect, useState } from "react";
import Header from "../components/header";
import { getDiets, createDiet, addDish } from "../services/diets.services";
import { Diet } from "../Models/diet";
import "./diets.css";
import DietsTable from "../components/dietstable";
import { DietRegistrationModal } from "../components/dietregistrationmodal";
import { getToken } from "../Models/token";

const Diets = () => {
    const [diets, setDiets] = useState<Diet[]>([]);
    const [allDiets, setAllDiets] = useState<Diet[]>([]);
    const [selectedDiet, setSelectedDiet] = useState<Diet | null>(null);
    const [isNewDietModalOpen, setIsNewDietModalOpen] = useState(false);

    useEffect(() => {
        const fetchDiets = async () => {
            const data = await getDiets();
            setAllDiets(data);
            setDiets(data);
        };

        fetchDiets();
    }, []);

    const handleAddToDiet = (item: Diet) => {
        setSelectedDiet(item);
        setIsNewDietModalOpen(true);
    };

    const handleRegisterNewDiet = async (newDiet: Diet) => {
        try {
            const result = await createDiet(newDiet);
            const updatedDiets = await getDiets();
            setAllDiets(updatedDiets);
            setDiets(updatedDiets);
            setIsNewDietModalOpen(false);
        } catch (error) {
            console.error("Error al registrar nueva dieta:", error);
        }
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
                            + Nuevo Alimento
                        </button>
                        <DietsTable
                            data={diets}
                            onAddToDiet={handleAddToDiet}
                        />
                    </div>

                    <DietRegistrationModal
                        isOpen={isNewDietModalOpen}
                        onClose={() => setIsNewDietModalOpen(false)}
                        onRegistrar={handleRegisterNewDiet}
                    />
                </main>
            </div>
        </div >
    );
}

export default Diets;