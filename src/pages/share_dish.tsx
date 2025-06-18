import "./share_dish.css";

import { useEffect, useState } from "react";
import { DevUrl } from "../env/dev.url.model";
import { useNavigate, useParams } from "react-router";
import { getToken } from "../Models/token";
import Header from "../components/header";

type Client = {
  id: number;
  name: string;
};

function ShareDish() {
  const { dishId } = useParams();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = getToken();

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
      setError("No se pudieron cargar los clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleShare = async (clientId: number) => {
    try {
      const res = await fetch(`${DevUrl.baseUrl}/trainer/share_dish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dish_id: dishId,
          client_id: clientId,
        }),
      });
      if (!res.ok) throw new Error();
      alert("Plato compartido con éxito");
      navigate("/nutrition");
    } catch {
      alert("No se pudo compartir el plato.");
    }
  };

  return (
    <>
      <Header />
      <div className="share-dish-container">
        <h2>Selecciona un cliente para compartir el plato</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {clients.map((client) => (
              <li key={client.id}>
                {client.name}
                <button onClick={() => handleShare(client.id)}>
                  Compartir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default ShareDish;