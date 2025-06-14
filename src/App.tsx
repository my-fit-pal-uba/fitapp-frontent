import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/login';
import Home from './pages/home';
import SignUp from './pages/signup';
import Registration from './pages/registration';
import Profile from './pages/profile';
import Exercises from './pages/exercises';
import Routines from './pages/routines'
import CreateRoutine from './pages/createRoutine';
import RoutineHistory from './pages/routine_history';
import RealizarEjercicio from './pages/do_exercises.tsx';
import { UserProvider } from './context/user_context.tsx';
import Nutrition from './pages/nutrition.tsx';
import Diets from './pages/diets.tsx';
import AddDishToDiet from './pages/add_dish_to_diet';
import GoalsPage from './pages/goals';
import PhotosPage from './pages/my_photos.tsx';


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
          <Route path="/routines" element={<Routines />} /> 
          <Route path="/routines/create" element={<CreateRoutine />} />
          <Route path="/rutine-history" element={<RoutineHistory />} />
          <Route path="/exercises" element={<Exercises />} /> 
          <Route path="/nutrition" element={<Nutrition/>} />
          <Route path="/diets" element={<Diets/>} />
          <Route path="/diet/:dietId/add-dish" element={<AddDishToDiet />} />
          <Route path="/realizar/:id" element={<RealizarEjercicio />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/my_photos" element={<PhotosPage />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;