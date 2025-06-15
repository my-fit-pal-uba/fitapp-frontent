import { useEffect, useState } from 'react';
import Header from '../components/header';
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

  const hardcodedClients: Client[] = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María González' },
    { id: 3, name: 'Carlos López' },
    { id: 4, name: 'Ana Torres' },
    { id: 5, name: 'Lucía Fernández' },
  ];

  const fetchClients = () => {
    setClients(hardcodedClients);
  };

  const handleAssociate = () => {
    const trimmedCode = code.trim();
    if (trimmedCode === '') {
      setError('Ingresá un código válido.');
      setSuccess('');
      return;
    }

    const fakeNewClient: Client = {
      id: clients.length + 1,
      name: `Cliente Asociado ${trimmedCode}`,
    };

    setClients((prev) => [...prev, fakeNewClient]);
    setCode('');
    setSuccess(`Cliente asociado con el código: ${trimmedCode}`);
    setError('');
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

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
                {/* Acá podrías agregar botones como "Ver más" o "Eliminar" */}
                <button className="client-button">Ver más</button>
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