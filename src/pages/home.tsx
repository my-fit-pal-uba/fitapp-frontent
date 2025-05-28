import './login.css';
import Header from '../components/header';
import { useNavigate } from 'react-router';

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
      </main>
    </>
  );
}

export default Home;