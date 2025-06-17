import './login.css';
import './home.css';
import Header from '../components/header';
import Registrator from '../components/registrator';
import Clock from '../components/clock';
import { getCaloriesHistory, getWeightHistory } from '../services/history.services';
import { getToken } from '../Models/token';
import { postCalories, postWeight } from '../services/registration.services';
import Chart from '../components/bar';
import { useEffect, useState } from 'react';

function Home() {

  const user_id = getToken()?.user_id ?? 0;
  const [goalLine, setGoalLine] = useState<number | null>(null);
  const user = getToken();

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
    if (user) {
      console.log("Rol del usuario:", user.rol);
    }
    fetchLatestGoal();
  }, [user_id, user]);

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="home-content-wrapper">
          <div className="inputs-wrapper">

            <Clock />
            <Registrator
              type="weight"
              onSubmit={(weight) => postWeight(user_id, Number(weight) ?? 0.0)}
            />
            <Registrator
              type="calories"
              onSubmit={(calories) => postCalories(user_id, Number(calories) ?? 0.0)}
            />
          </div>
          <div className="charts-wrapper">
            <div className="chart-wrapper">
              <h2>Historial de calorias</h2>
              <Chart
                chartType='line'
                fetchData={async () => await getCaloriesHistory(user_id)}
              />
            </div>
            <div className="chart-wrapper">
              <h2>Historial de peso</h2>
              <Chart
                chartType='line'
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

export default Home;