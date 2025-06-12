import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import { FaStar } from 'react-icons/fa';

const genres = [
  {
    title: 'Ação e Comédia',
    filmes: [
      {
        id: 1,
        titulo: 'Avatar',
        genero: 'Ação, Ficção',
        descricao: 'Um épico de ficção científica dirigido por James Cameron.',
        nota: '5.9',
        imagem: 'https://image.tmdb.org/t/p/w300/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg'
      },
      {
        id: 2,
        titulo: 'Toy Story',
        genero: 'Animação, Comédia',
        descricao: 'Aventura dos brinquedos que ganham vida quando ninguém está olhando.',
        nota: '7.2',
        imagem: 'https://image.tmdb.org/t/p/w300/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg'
      },
      {
        id: 3,
        titulo: 'Bohemian Rhapsody',
        genero: 'Drama, Biografia',
        descricao: 'A história de Freddie Mercury e do Queen.',
        nota: '8.0',
        imagem: 'https://image.tmdb.org/t/p/w300/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg'
      },
    ],
  },
  {
    title: 'Drama e Terror',
    filmes: [
      {
        id: 4,
        titulo: 'O Exorcista',
        genero: 'Terror, Suspense',
        descricao: 'Um clássico aterrorizante do cinema de horror.',
        nota: '7.4',
        imagem: 'https://image.tmdb.org/t/p/w300/4ucLGcXVVSVnsfkGtbLY4XAius8.jpg'
      },
      {
        id: 5,
        titulo: 'O Poderoso Chefão',
        genero: 'Drama, Crime',
        descricao: 'A saga da família Corleone no submundo da máfia.',
        nota: '9.2',
        imagem: 'https://image.tmdb.org/t/p/w300/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'
      },
      {
        id: 6,
        titulo: 'Joker',
        genero: 'Drama, Crime',
        descricao: 'Origem sombria do arqui-inimigo do Batman.',
        nota: '8.5',
        imagem: 'https://image.tmdb.org/t/p/w300/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg'
      },
    ],
  },
];

export default function Home() {
  const [favoritos, setFavoritos] = useState({});
  const navigate = useNavigate();

  const toggleFavorito = (filme) => {
    setFavoritos(prev => ({ ...prev, [filme.id]: !prev[filme.id] }));
    navigate('/favorites', { state: { filme } });
  };

  const goToDetails = (filme) => {
    navigate('/favorites', { state: { filme } });
  };

  return (
    <div className="home-container">
      <aside className="side-menu">
        <button onClick={() => navigate('/profile')}>Perfil</button>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/favorites')}>Favoritos</button>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <button className="menu-button">☰</button>
          <div className="logo">CF</div>
          <div className="actions">
            <button
              className="cadastro-button"
              onClick={() => navigate('/cadastro')}
            >
              Cadastrar Filme
            </button>
            <button className="search-button">🔍</button>
          </div>
        </header>

        {genres.map((categoria) => (
          <section key={categoria.title} className="genre-section">
            <h2>{categoria.title}</h2>
            <div className="movie-grid">
              {categoria.filmes.map((filme) => {
                const isFav = favoritos[filme.id];
                return (
                  <div key={filme.id} className="movie-item">
                    <img src={filme.imagem} alt={filme.titulo} />
                    <div className="movie-info-overlay">
                      <h3>{filme.titulo}</h3>
                      <p className="movie-note">{filme.nota.replace('.', ',')}/10</p>
                    </div>
                    <div className="movie-actions">
                      <FaStar
                        className={`star-icon ${isFav ? 'ativo' : ''}`}
                        onClick={() => toggleFavorito(filme)}
                      />
                      <button
                        className="details-button"
                        onClick={() => goToDetails(filme)}
                      >
                        Detalhes
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
