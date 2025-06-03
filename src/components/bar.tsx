import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './bar.css';
import { ChartValue } from '../Models/chartValues';
import { getToken } from '../Models/token';
import { User } from '../Models/user';

type ChartExampleProps = {
    chartType?: 'bar' | 'line';
    fetchData: (user_id: number) => Promise<ChartValue[]> | ChartValue[];
};

const ChartExample = ({ chartType = 'bar', fetchData }: ChartExampleProps) => {
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
                console.error('Error fetching chart data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [fetchData]);

    if (loading) {
        return <div className="chart-container loading">Cargando datos...</div>;
    }

    if (error) {
        return <div className="chart-container error">{error}</div>;
    }

    if (data.length === 0) {
        return <div className="chart-container empty">No hay datos disponibles</div>;
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
                        <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Calorias consumidas" />
                    </LineChart>
                )}
            </ResponsiveContainer>
        </div>
    );
};

export default ChartExample;