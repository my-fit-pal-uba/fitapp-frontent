import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';
import Home from './pages/home';
import { UserProvider } from './context/user_context.tsx';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;