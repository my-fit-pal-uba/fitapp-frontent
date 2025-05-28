import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/login';
import Home from './pages/home';
import SignUp from './pages/signup';
import Registration from './pages/registration';
import Profile from './pages/profile';
import Exercises from './pages/exercises';
import { UserProvider } from './context/user_context.tsx';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/exercises" element={<Exercises />} /> 
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;