import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/login';
import Home from './pages/home';
import SignUp from './pages/signup';
import Registration from './pages/registration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Login />} /> 
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;