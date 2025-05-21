import { useState, FormEvent, JSX } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Header from '../components/header';
import { useUser } from '../context/user_context';

function Home() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!user?.email) return;

      setLoading(true);
      try {
        const res = await fetch(`http://172.21.0.3:8080/users/info?email=${encodeURIComponent(user.email)}`);
        const jsonResponse = await res.json();
        console.log(jsonResponse)
        if (jsonResponse.response == true && jsonResponse.message) {
          setUser({
            email: jsonResponse.message[1].email,
            name: jsonResponse.message[1].first_name,
            lastName: jsonResponse.message[1].last_name,
          });
        } else {
          console.error('Error al obtener perfil:', jsonResponse.message || 'Respuesta inválida');
        }
      } catch (err) {
        console.error('Error cargando perfil:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user?.email, setUser]);


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