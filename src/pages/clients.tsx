import { useEffect, useState } from 'react';
import Header from '../components/header';
import { getToken } from '../Models/token';
import { User } from '../Models/user';
import { useNavigate } from 'react-router';
import { DevUrl } from "../env/dev.url.model";
import './clients.css';

type Client = {
  id: number;
  name: string;
};

function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const user: User | null = getToken();

  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
        const response = await fetch(`${DevUrl.baseUrl}/trainer/clients/${user?.user_id}`, {
        headers: {
            'Accept': 'application/json',
        },
        });

        if (!response.ok) {
        throw new Error('Error al obtener clientes');
        }

        const data = await response.json();
        const formattedClients: Client[] = data.map((client: any) => ({
        id: client.user_id,
        name: `${client.first_name} ${client.last_name}`,
        }));
        setClients(formattedClients);
    } catch (error) {
        console.error(error);
        setClients([]);
    }
    };

  const handleAssociate = async () => {
  const trimmedCode = code.trim();
  if (trimmedCode === '') {
    setError('Ingresá un código válido.');
    setSuccess('');
    return;
  }

  try {
    const response = await fetch(`${DevUrl.baseUrl}/trainer/register_client`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_key: trimmedCode,
        trainer_id: user?.user_id,  // acá podrías usar un estado o prop para que sea dinámico
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || 'Error al asociar cliente');
      setSuccess('');
      return;
    }

    const result = await response.json();
    setCode('');
    setSuccess(`Cliente asociado con el código: ${trimmedCode}`);
    setError('');
    await fetchClients();
  } catch (error) {
    setError('No se pudo conectar con el servidor.');
    setSuccess('');
  }
};

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDropdownChange = (clientId: number, value: string) => {
    
    if(value === '') return;

    if (value === 'weight_calories') {
      navigate(`/clients/${clientId}`);
    }
    else if (value === 'profile') {
      navigate(`/clients/${clientId}/profile`);
    }
    else if (value === 'routine_history') {
      navigate(`/clients/${clientId}/routine-history`);
    } else if (value === 'exercise_history') {
      navigate(`/clients/${clientId}/exercise-history`);
    }
  };

  return (
    <>
      <Header />
      <main className="my-clients-container">
        <h1>Mis Clientes</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar cliente por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="clients-grid">
          {filteredClients.map((client) => (
            <div className="client-card" key={client.id}>
              <div className="client-info">
                <h2>{client.name}</h2>
              </div>
              <div className="client-actions">
                <select
                  onChange={(e) => handleDropdownChange(client.id, e.target.value)}
                  className="client-dropdown"
                >
                  <option value="">Ver Más</option>
                  <option value="profile">Ver Perfil</option>
                  <option value="weight_calories">Peso y calorías</option>
                  <option value="routine_history">Historial rutinas</option>
                  <option value="exercise_history">Historial ejercicios</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="associate-section">
          <h2>Asociar Cliente por Código</h2>
          <input
            type="text"
            placeholder="Código de vinculación"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={handleAssociate}>Asociar</button>

          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
        </div>
      </main>
    </>
  );
}

export default Clients;