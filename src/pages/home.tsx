import './login.css';
import './home.css';
import Header from '../components/header';
import Registrator from '../components/registrator';
import Clock from '../components/clock';
import ChartExample from '../components/bar';

function Home() {
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="home-content-wrapper">
          <div className="inputs-wrapper">

            <Registrator
              type="weight"
              onSubmit={(weight) => alert(`Peso registrado: ${weight} kg`)}
            />
            <Registrator
              type="calories"
              onSubmit={(calories) => alert(`Calorías registradas: ${calories} kcal`)}
            />
            <Clock />
          </div>
          <div className="charts-wrapper">

            <ChartExample />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;