import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './Favorites.css';

const DetalhesFilme = () => {
  const [favorito, setFavorito] = useState(false);

  const toggleFavorito = () => {
    setFavorito(!favorito);
  };

  return (
    <div className="detalhes-filme">
      <header className="top-bar">
        <button className="menu-button">☰</button>
        <div className="logo">CF</div>
        <button className="search-button">🔍</button>
      </header>

      <div className="detalhes-container">
        <img
          className="poster-filme"
          src="https://imgs.search.brave.com/9lvQZgbNvA9-VD8NrXGT3PzhvFGCPYWYYPcgrN-0ETI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9taWRp/YXMuaW1hZ2VtZmls/bWVzLmNvbS5ici9j/YXBhcy8yMjNlMGI5/Zi00MGIzLTRlMmUt/ODZmMC02NmFjMGJl/YmEyN2ZfbS5qcGc_/MjAyMi0wMi0yNVQx/MDo1MzoxNi44NjI1/Mjg"
          alt="Poster do filme"
        />

        <div className="info-filme">
          <h1>Nome do Filme</h1>
          <button
            className="estrela-botao"
            onClick={toggleFavorito}
            style={{ color: favorito ? '#FFFA72' : '#fff' }}
          >
            <FaStar size={32} />
          </button>
          <p className="nota2">
            {/* nota do filme aqui se desejar */}
          </p>
          <div className="onde-assistir">
            <strong>Onde assistir:</strong>
            <ul>
              <li>Netflix</li>
              <li>Prime Video</li>
              <li>Disney+</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="recomendados">
        <h2>Recomendados</h2>
        <div className="filmes-recomendados">
          <img src="https://via.placeholder.com/150x220" alt="Filme 1" />
          <img src="https://via.placeholder.com/150x220" alt="Filme 2" />
          <img src="https://via.placeholder.com/150x220" alt="Filme 3" />
          <img src="https://via.placeholder.com/150x220" alt="Filme 4" />
        </div>
      </div>
    </div>
  );
};

export default DetalhesFilme;
