import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/login';
import SignUp from './pages/singup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;