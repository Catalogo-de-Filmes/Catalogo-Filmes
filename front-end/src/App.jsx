// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Favorites from './pages/Favorites/Favorites';
import CadastroFilmes from './pages/CadastroFilmes/CadastroFilmes'; // <- Importação correta

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cadastro" element={<CadastroFilmes />} /> {/* <- Rota adicionada */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
