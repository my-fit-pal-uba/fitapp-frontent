import './home.css';
import Header from '../components/header';
import Clock from '../components/clock';
import Chart from '../components/bar';
import { getCaloriesHistory, getWeightHistory } from '../services/history.services';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function ClientDetails() {
  const { clientId } = useParams<{ clientId: string }>();
  const user_id = parseInt(clientId ?? '0', 10);
  const [goalLine, setGoalLine] = useState<number | null>(null);

  const fetchLatestGoal = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/goals/current?user_id=${user_id}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });

      if (!response.ok) {
        console.error("No se pudo obtener el objetivo");
        return;
      }

      const data = await response.json();
      const parsedGoal = parseFloat(data.message.goal_value);
      if (!isNaN(parsedGoal)) {
        setGoalLine(parsedGoal);
      }
    } catch (error) {
      console.error("Error al obtener el objetivo:", error);
    }
  };

  useEffect(() => {
    fetchLatestGoal();
  }, [user_id]);

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="home-content-wrapper">
          <div className="charts-wrapper">
            <div className="chart-wrapper">
              <h2 className="chart-title">Historial de calorías</h2>
              <Chart
                chartType="line"
                fetchData={async () => await getCaloriesHistory(user_id)}
              />
            </div>
            <div className="chart-wrapper">
              <h2 className="chart-title">Historial de peso</h2>
              <Chart
                chartType="line"
                fetchData={async () => await getWeightHistory(user_id)}
                goalLine={goalLine ?? undefined}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ClientDetails;