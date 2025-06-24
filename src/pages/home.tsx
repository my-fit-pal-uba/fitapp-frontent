import './home.css';
import Header from '../components/header';
import Registrator from '../components/registrator';
import Clock from '../components/clock';
import { getCaloriesHistory, getWeightHistory } from '../services/history.services';
import { getToken } from '../Models/token';
import { postCalories, postWeight } from '../services/registration.services';
import Chart from '../components/bar';
import { useEffect, useState } from 'react';
import { DevUrl } from "../env/dev.url.model";

function Home() {
  const user = getToken();
  const user_id = user?.user_id ?? 0;
  const [goalLine, setGoalLine] = useState<number | null>(null);

  const fetchLatestGoal = async () => {
    try {
      const response = await fetch(`${DevUrl.baseUrl}/goals/current?user_id=${user_id}`, {
        method: 'GET',
        headers: { accept: 'application/json' },
      });
      if (!response.ok) return;
      const data = await response.json();
      const parsedGoal = parseFloat(data.message.goal_value);
      if (!isNaN(parsedGoal)) setGoalLine(parsedGoal);
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
        <div className="home-greeting">
          <h1  className="dashboard-title">🏋️‍♂️ ¡Vamos por tu meta, {user?.username || "usuario"}!</h1>
          <p className="dashboard-subtitle">Seguimos avanzando hacia tu objetivo diario</p>
        </div>

        <section className="home-section">
          <h2>📋 Registro de hoy</h2>
          <Clock />
          <div style={{ paddingBottom: '1rem' }}>
            <Registrator
              type="weight"
              onSubmit={(weight) => postWeight(user_id, Number(weight) ?? 0.0)}
            />
          </div>
          <div>
            <Registrator
              type="calories"
              onSubmit={(calories) => postCalories(user_id, Number(calories) ?? 0.0)}
            />
          </div>
        </section>

        <section className="home-section">
          <h2>📈 Tu progreso</h2>
          <div className="charts-wrapper">
            <div className="home-chart-wrapper">
              <h3>Historial de calorías</h3>
              <Chart chartType='line' fetchData={() => getCaloriesHistory(user_id)} />
            </div>
            <div className="home-chart-wrapper">
              <h3>Historial de peso</h3>
              <Chart chartType='line' fetchData={() => getWeightHistory(user_id)} goalLine={goalLine ?? undefined} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;