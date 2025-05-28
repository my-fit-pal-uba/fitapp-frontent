import './login.css';
import './home.css';
import Header from '../components/header';
import { useNavigate } from 'react-router';
import Registrator from '../components/registrator';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <main className="main-content">
        <h1>Bienvenido a la Home Page</h1>
        <p>Esta es la página principal después de iniciar sesión.</p>
         <button
          onClick={() => navigate('/exercises')}
          className="navigate-button"
        >
          Ejercicios
        </button>
        <div className="home-content-wrapper">
          <Registrator />
        </div>
      </main>
    </>
  );
}

export default Home;