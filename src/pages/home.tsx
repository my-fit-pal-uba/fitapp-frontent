import './login.css';
import Header from '../components/header';

function Home() {
  return (
    <>
      <Header />
      <main className="main-content">
        <h1>Bienvenido a la Home Page</h1>
        <p>Esta es la página principal después de iniciar sesión.</p>
      </main>
    </>
  );
}

export default Home;