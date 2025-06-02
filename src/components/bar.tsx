import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './bar.css'; 

const data = [
    { name: 'Enero', ventas: 65 },
    { name: 'Febrero', ventas: 59 },
    { name: 'Marzo', ventas: 80 },
    { name: 'Abril', ventas: 81 },
    { name: 'Mayo', ventas: 56 },
];

const ChartExample = () => {
    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ventas" fill="#8884d8" name="Ventas mensuales" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartExample;