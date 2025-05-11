import './App.css'
import Login from './pages/login';

function App() {
  return <Login onLogin={function (): void {
    throw new Error('Function not implemented.');
  } } error={''} setError={function (): void {
    throw new Error('Function not implemented.');
  } } />;
}

export default App
