// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Favorites from './pages/Favorites/Favorites'; // Importa o componente

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        
        {/* ROTA TEMPORÁRIA para você testar a tela de favoritos */}
        <Route path="/favorites" element={<Favorites />} />

        {/* fallback para login ou página 404 */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
