import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Header from '../components/header';
import "./food_tracking.css";
import { TrackingHistory } from '../Models/tracking_history';
import { getTrackingHistory } from '../services/food_tracking';
import Chart from '../components/bar';

const ClientFoodTracking = () => {
    const { clientId } = useParams<{ clientId: string }>();
    const numericClientId = parseInt(clientId ?? "0", 10);

    const [history, setHistory] = useState<TrackingHistory[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getTrackingHistory(numericClientId);
                setHistory(history);
            } catch (err) {
                console.error(err);
                setError("No se pudo obtener el historial del cliente.");
            }
        };
        fetchHistory();
    }, [numericClientId]);

    const getCaloriesHistory = () => {
        return history.map((entry: TrackingHistory) => (
            {
                name: entry.fecha_consumo,
                value: entry.total_calorias
            }
        ));
    };

    const getFatsHistory = () => {
        return history.map((entry: TrackingHistory) => (
            {
                name: entry.fecha_consumo,
                value: entry.total_grasas
            }
        ));
    }

    const getProteinsHistory = () => {
        return history.map((entry: TrackingHistory) => (
            {
                name: entry.fecha_consumo,
                value: entry.total_proteinas
            }
        ));
    }

    const getCarbsHistory = () => {
        return history.map((entry: TrackingHistory) => (
            {
                name: entry.fecha_consumo,
                value: entry.total_carbohidratos
            }
        ));
    }
    return (
        <>
            <Header />
            <div className="tracking-app">
                <h1>Historial de consumos</h1>
                <div className="graphics-wrapper">
                    <div className="chart-wrapper">
                        <h2 className='graph-title'>Consumo calorico</h2>
                        <Chart
                            chartType='line'
                            fetchData={() => getCaloriesHistory()}
                        />
                    </div>

                    <div className="chart-wrapper">
                        <h2 className='graph-title'>Consumo de grasas</h2>
                        <Chart
                            chartType='line'
                            fetchData={() => getFatsHistory()}
                        />
                    </div>

                    <div className="chart-wrapper">
                        <h2 className='graph-title'>Consumo de proteinas</h2>
                        <Chart
                            chartType='line'
                            fetchData={() => getProteinsHistory()}
                        />
                    </div>

                    <div className="chart-wrapper">
                        <h2 className='graph-title'>Consumo de carbohidratos</h2>
                        <Chart
                            chartType='line'
                            fetchData={() => getCarbsHistory()}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientFoodTracking;