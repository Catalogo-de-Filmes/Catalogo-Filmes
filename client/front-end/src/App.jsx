import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Home from './pages/Home/Home';
import DetalhesFilme from './pages/DescFilme/DetalhesFilme';
import Favorites from './pages/Favorites/Favorites';
import Perfil from './pages/Profile/Profile';
import PrivateRoute from './routes/PrivateRoute';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/filme/:id"
          element={
            <PrivateRoute>
              <DetalhesFilme />
            </PrivateRoute>
          }
        />
        <Route
          path="/favoritos"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
