import { useEffect } from "react";
import Header from "../components/header";
import { getDiets } from "../services/diets.services";
import { Diet } from "../Models/diet";

import { useState } from "react";
import DietsTable from "../components/dietstable";

const Diets = () => {
    const [diets, setDiets] = useState<Diet[]>([]);

    useEffect(() => {
        const fetchDiets = async () => {
            const data = await getDiets();
            console.table(data)
            setDiets(data);
        };
        fetchDiets();
    }, []); 

    return (
        <><Header/>
        <h1 className="diets-title">Dietas Alimenticias</h1>
            <div className="diets-container">
                <div className="table-wrapper">
                    <DietsTable data={diets}/>
                </div>
            </div>
        </>
    );
}

export default Diets;