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
import Notifications from './pages/notifications.tsx';
import Clients from './pages/clients.tsx';
import ClientDetails from './pages/client_details.tsx';
import ClientProfile from './pages/client_profile.tsx';
import ClientRoutineHistory from './pages/client_routine_history.tsx';
import RoleProtectedRoute from './components/role_protected_route.tsx';
import ShareExercise from "./pages/share_exercise";
import ShareDish from './pages/share_dish.tsx';
import SharedItems from './pages/shared';

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
          <Route path="/compartir-ejercicio/:exerciseId" element={<ShareExercise />} />
          <Route path="/compartir-plato/:dishId" element={<ShareDish />} />
          <Route path="/shared" element={<SharedItems />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route
            path="/clients"
            element={
              <RoleProtectedRoute allowedRoles={["personal_trainer"]}>
                <Clients />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/clients/:clientId"
            element={
              <RoleProtectedRoute allowedRoles={["personal_trainer"]}>
                <ClientDetails />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/clients/:clientId/profile"
            element={
              <RoleProtectedRoute allowedRoles={["personal_trainer"]}>
                <ClientProfile />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/clients/:clientId/routine-history"
            element={
              <RoleProtectedRoute allowedRoles={["personal_trainer"]}>
                <ClientRoutineHistory />
              </RoleProtectedRoute>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;