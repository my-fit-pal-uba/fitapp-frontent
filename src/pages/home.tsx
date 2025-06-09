import './login.css';
import './home.css';
import Header from '../components/header';
import Registrator from '../components/registrator';
import Clock from '../components/clock';
import { getCaloriesHistory, getWeightHistory } from '../services/history.services';
import { getToken } from '../Models/token';
import { postCalories, postWeight } from '../services/registration.services';
import Chart from '../components/bar';

function Home() {

  const user_id = getToken()?.user_id ?? 0;

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
                goalLine={50}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;