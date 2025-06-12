import React from 'react';
import { useNavigate } from 'react-router-dom';
import './inicial.css';

function Inicial() {
  const navigate = useNavigate();

  return (
    <div className="initial-screen">
      {/* Menu Lateral */}
      <div className="side-menu">
        <button className="menu-button" onClick={() => navigate('/perfil')}>
          Perfil
        </button>
        <button className="menu-button" onClick={() => navigate('/home')}>
          Home
        </button>
        <button className="menu-button" onClick={() => navigate('/favoritos')}>
          Favoritos
        </button>
      </div>

      {/* Conteúdo Principal */}
      <div className="main-content">
        {/* Carrossel de Destaques */}
        <div className="carousel-section">
          <h2>Filmes em Destaque</h2>
          <div className="carousel">
            {[1, 2, 3, 4, 5].map((item) => (
              <img
                key={item}
                src={`https://via.placeholder.com/250x150?text=Filme+${item}`}
                alt={`Filme ${item}`}
              />
            ))}
          </div>
        </div>

        {/* Seções por Gênero */}
        <div className="genre-section">
          {['Ação', 'Comédia', 'Drama', 'Terror', 'Animação', 'Documentário'].map((genre) => (
            <div className="genre-row" key={genre}>
              <h3>{genre}</h3>
              <div className="genre-carousel">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div className="movie-card" key={i}>
                    <img
                      src={`https://via.placeholder.com/150x200?text=${genre}+${i}`}
                      alt={`${genre} ${i}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inicial;
