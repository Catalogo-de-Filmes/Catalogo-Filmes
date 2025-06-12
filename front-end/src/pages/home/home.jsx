import React, { useState } from 'react';
import './home.css';
import { FaStar } from 'react-icons/fa';

const genres = [
  {
    title: 'Ação e comédia',
    images: [
      'https://picsum.photos/id/1015/200/300',
      'https://picsum.photos/id/1016/200/300',
      'https://picsum.photos/id/1018/200/300',
      'https://picsum.photos/id/1020/200/300',
      'https://picsum.photos/id/1024/200/300',
      'https://picsum.photos/id/1027/200/300',
    ],
  },
  {
    title: 'Drama e terror',
    images: [
      'https://picsum.photos/id/1032/200/300',
      'https://picsum.photos/id/1033/200/300',
      'https://picsum.photos/id/1035/200/300',
      'https://picsum.photos/id/1036/200/300',
      'https://picsum.photos/id/1038/200/300',
      'https://picsum.photos/id/1039/200/300',
    ],
  },
];

const Home = () => {
  const [favoritos, setFavoritos] = useState({});

  const toggleFavorito = (genreIndex, imageIndex) => {
    const key = `${genreIndex}-${imageIndex}`;
    setFavoritos((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="home-container">
      <aside className="side-menu">
        <button>Perfil</button>
        <button>Home</button>
        <button>Favoritos</button>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <button className="menu-button">☰</button>
          <div className="logo">CF</div>
          <div className="actions">
            <button
              className="cadastro-button"
              onClick={() => window.location.href = '/cadastro'}
            >
              Cadastrar Filme
            </button>
            <button className="search-button">🔍</button>
          </div>
        </header>

        <section className="carousel">
          <div className="carousel-images">
            {[1010, 1011, 1012, 1013, 1014].map((id) => (
              <img
                key={id}
                src={`https://picsum.photos/id/${id}/200/300`}
                alt="banner"
              />
            ))}
          </div>
        </section>

        {genres.map((genre, genreIndex) => (
          <section key={genreIndex} className="genre-section">
            <h2>{genre.title}</h2>
            <div className="movie-grid">
              {genre.images.map((src, imageIndex) => {
                const key = `${genreIndex}-${imageIndex}`;
                const isFavorito = favoritos[key];

                return (
                  <div key={key} className="movie-item">
                    <img src={src} alt={`movie-${imageIndex}`} />
                    <FaStar
                      className={`star-icon ${isFavorito ? 'ativo' : ''}`}
                      onClick={() => toggleFavorito(genreIndex, imageIndex)}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Home;
