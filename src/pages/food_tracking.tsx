import { useEffect, useState } from 'react';
import Header from '../components/header';
import "./food_tracking.css"
import { TrackingHistory } from '../Models/tracking_history';
import { getTrackingHistory } from '../services/food_tracking';
import Chart from '../components/bar';
const FoodTracking = () => {


    const [history, setHistory] = useState<TrackingHistory[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const history = await getTrackingHistory(11);
            console.table(history);
            setHistory(history);
        };
        fetchHistory();
    }, []);

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
                <h1>Tracking Page</h1>
                <div className="graphics-wrapper">
                    <div className="chart-wrapper">
                        <h2 className='graph-title'>Historial de peso</h2>
                        <Chart
                            chartType='line'
                            fetchData={() => getCaloriesHistory()}
                        />
                    </div>

                    <div className="chart-wrapper">
                        <h2 className='graph-title'>Historial de peso</h2>
                        <Chart
                            chartType='line'
                            fetchData={() => getFatsHistory()}
                        />
                    </div>

                    <div className="chart-wrapper">
                        <h2 className='graph-title'>Historial de peso</h2>
                        <Chart
                            chartType='line'
                            fetchData={() => getProteinsHistory()}
                        />
                    </div>

                    <div className="chart-wrapper">
                        <h2 className='graph-title'>Historial de peso</h2>
                        <Chart
                            chartType='line'
                            fetchData={() => getCarbsHistory()}
                        />
                    </div>
                </div>
            </div></>
    );
}

export default FoodTracking;