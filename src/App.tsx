import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiData, setApiData] = useState("")

  const fetchData = () => {
    fetch('http://localhost:8080') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la API')
        }
        return response.text()
      })
      .then((data) => setApiData(data))
      .catch((error) => console.error('Error:', error))
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <h2>Datos de la API:</h2>
        <button onClick={fetchData}>Cargar datos de la API</button>
        <p>{apiData || "Haz clic en el botón para cargar los datos"}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
