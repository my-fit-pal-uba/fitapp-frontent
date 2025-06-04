import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './bar.css';
import { ChartValue } from '../Models/chartValues';
import { getToken } from '../Models/token';
import { User } from '../Models/user';

type ChartProps = {
    chartType?: 'bar' | 'line';
    fetchData: (user_id: number) => Promise<ChartValue[]> | ChartValue[];
};

const Chart = ({ chartType = 'bar', fetchData }: ChartProps) => {
    const [data, setData] = useState<ChartValue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const token: User | null = getToken();
                if (!token) {
                    setData([]);
                    return;
                }
                const result = await fetchData(token.user_id);
                setData(result);
                setError(null);
            } catch (err) {
                setError('Error al cargar los datos');
                setData([]);
                console.error('Error fetching chart data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [fetchData]);

    if (data.length === 0) {
        return (
            <div className="chart-container empty" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <div className="empty-state" style={{ textAlign: 'center' }}>
                    <h3 className="empty-title" style={{ color: 'black' }}>No hay datos disponibles</h3>
                    <p className="empty-message" style={{ color: 'black' }}>Aún no has registrado información para este período.</p>
                </div>
            </div>
        );
    }

    if (data === undefined || data === null) {
        return (
            <div className="chart-container empty" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <div className="empty-state" style={{ textAlign: 'center' }}>
                    <h3 className="empty-title" style={{ color: 'black' }}>No hay datos disponibles</h3>
                    <p className="empty-message" style={{ color: 'black' }}>Ha ocurrido un error</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div className="chart-container loading">Cargando datos...</div>;
    }

    if (error) {
        return <div className="chart-container error">{error}</div>;
    }

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
                {chartType === 'bar' ? (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" name="Ventas mensuales" />
                    </BarChart>
                ) : (
                    <LineChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#82ca9d" name="tu evolucion " />
                    </LineChart>
                )}
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;