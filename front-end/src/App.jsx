import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const allMovies = [
    { id: 1, title: 'Avatar', genre: 'Ação', image: 'https://image.tmdb.org/t/p/w300/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg', description: 'Um épico de ficção científica.', isFavorite: false },
    { id: 2, title: 'Toy Story', genre: 'Comédia', image: 'https://image.tmdb.org/t/p/w300/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg', description: 'Uma aventura com brinquedos.', isFavorite: false },
    { id: 3, title: 'Bohemian Rhapsody', genre: 'Drama', image: 'https://image.tmdb.org/t/p/w300/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', description: 'A história de Freddie Mercury.', isFavorite: false },
    { id: 4, title: 'O Exorcista', genre: 'Terror', image: 'https://image.tmdb.org/t/p/w300/4ucLGcXVVSVnsfkGtbLY4XAius8.jpg', description: 'Um clássico do terror.', isFavorite: false },
    { id: 5, title: 'O Poderoso Chefão', genre: 'Drama', image: 'https://image.tmdb.org/t/p/w300/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', description: 'Um clássico da máfia.', isFavorite: false },
    { id: 6, title: 'Forrest Gump', genre: 'Drama', image: 'https://image.tmdb.org/t/p/w300/saHP97rTPS5eLmrLQEcANmKrsFl.jpg', description: 'A vida de um homem extraordinário.', isFavorite: false },
    { id: 7, title: 'Gladiador', genre: 'Ação', image: 'https://image.tmdb.org/t/p/w300/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg', description: 'Uma luta pela liberdade.', isFavorite: false },
    { id: 8, title: 'Harry Potter', genre: 'Fantasia', image: 'https://image.tmdb.org/t/p/w300/hziiv14OpD73u9gAak4XDDfBKa2.jpg', description: 'A jornada de um jovem bruxo.', isFavorite: false },
    { id: 9, title: 'Django Livre', genre: 'Ação', image: 'https://image.tmdb.org/t/p/w300/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg', description: 'Uma história de vingança.', isFavorite: false },
    { id: 10, title: 'Interestelar', genre: 'Ficção Científica', image: 'https://image.tmdb.org/t/p/w300/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg', description: 'Uma viagem pelo espaço.', isFavorite: false },
    { id: 11, title: 'Titanic', genre: 'Romance', image: 'https://image.tmdb.org/t/p/w300/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', description: 'Uma história de amor trágica.', isFavorite: false },
    { id: 12, title: 'Corra!', genre: 'Suspense', image: 'https://image.tmdb.org/t/p/w300/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg', description: 'Um suspense psicológico.', isFavorite: false },
    { id: 13, title: 'Homem-Aranha', genre: 'Ação', image: 'https://image.tmdb.org/t/p/w300/fSbqPbqXa7ePo8bcnZYN9AHv6zA.jpg', description: 'A história de um herói aracnídeo.', isFavorite: false },
    { id: 14, title: 'Shrek', genre: 'Animação', image: 'https://image.tmdb.org/t/p/w300/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg', description: 'Uma aventura de conto de fadas.', isFavorite: false },
    { id: 15, title: 'Rocketman', genre: 'Biografia', image: 'https://image.tmdb.org/t/p/w300/f4FF18ia7yTvHf2izNrHqBmgH8U.jpg', description: 'A história de Elton John.', isFavorite: false },
    { id: 16, title: 'Deadpool', genre: 'Comédia', image: 'https://image.tmdb.org/t/p/w300/yGSxMiF0cYuAiyuve5DA6bnWEOI.jpg', description: 'Um anti-herói irreverente.', isFavorite: false },
    { id: 17, title: 'O Senhor dos Anéis', genre: 'Fantasia', image: 'https://image.tmdb.org/t/p/w300/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', description: 'Uma jornada épica.', isFavorite: false },
    { id: 18, title: 'Matrix', genre: 'Ficção Científica', image: 'https://image.tmdb.org/t/p/w300/vZpB8ezkFjZ9SSbYtWbO9QH1zjR.jpg', description: 'Bem-vindo à Matrix.', isFavorite: false },
    { id: 19, title: 'Pantera Negra', genre: 'Ação', image: 'https://image.tmdb.org/t/p/w300/uxzzxijgPIY7slzFvMotPv8wjKA.jpg', description: 'O herói de Wakanda.', isFavorite: false },
    { id: 20, title: 'Frozen', genre: 'Animação', image: 'https://image.tmdb.org/t/p/w300/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg', description: 'Uma aventura congelante.', isFavorite: false },
  ];
  const [movies, setMovies] = useState(allMovies);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showUserScreen, setShowUserScreen] = useState(false);
  const [userName, setUserName] = useState('Usuário');
  const [userImage, setUserImage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', username: '', password: '' });

  // Carregar favoritos do localStorage ao iniciar
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        savedFavorites.includes(movie.id) ? { ...movie, isFavorite: true } : movie
      )
    );
  }, []);

  // Salvar favoritos no localStorage
  const saveFavorites = () => {
    const favoriteIds = movies.filter((movie) => movie.isFavorite).map((movie) => movie.id);
    localStorage.setItem('favorites', JSON.stringify(favoriteIds));
  };

  // Alternar entre favoritar/desfavoritar
  const toggleFavorite = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
      )
    );
    saveFavorites();
  };

  // Alternar entre telas
  const toggleView = () => {
    setShowFavorites((prev) => !prev);
  };

  const toggleUserScreen = () => {
    setShowUserScreen((prev) => !prev);
  };

  const handleLogin = () => {
    if (loginData.email && loginData.username === 'admin' && loginData.password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('Email, nome de usuário ou senha inválidos!');
    }
  };

  const displayedMovies = showFavorites ? movies.filter((movie) => movie.isFavorite) : movies;

  return (
    <div className="app">
      {/* Tela de Login */}
      {!isLoggedIn && (
        <section className="login-screen">
          <h2>Login</h2>
          <div className="login-form">
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="login-input"
            />
            <input
              type="text"
              placeholder="Nome de usuário"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Senha"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="login-input"
            />
            <button className="login-button" onClick={handleLogin}>
              Entrar
            </button>
          </div>
        </section>
      )}

      {/* Cabeçalho */}
      {isLoggedIn && (
        <header className="header">
          <span className="menu-icon" onClick={toggleView}>
            {showFavorites ? '⬅ Voltar' : '⭐ Favoritos'}
          </span>
          <div className="logo">🎬 Catálogo de Filmes</div>
          <span className="user-icon" onClick={toggleUserScreen}>
            {showUserScreen ? '⬅ Voltar' : '👤 Usuário'}
          </span>
        </header>
      )}

      {/* Tela de Usuário */}
      {isLoggedIn && showUserScreen && (
        <section className="user-screen">
          <h2>Perfil do Usuário</h2>
          <div className="user-profile">
            <img
              src={userImage || 'https://via.placeholder.com/150'}
              alt="Foto de perfil"
              className="user-image"
            />
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="user-name-input"
              placeholder="Digite seu nome"
            />
            <input
              type="text"
              value={userImage}
              onChange={(e) => setUserImage(e.target.value)}
              className="user-image-input"
              placeholder="URL da imagem de perfil"
            />
          </div>
        </section>
      )}

      {/* Grade de Filmes */}
      {isLoggedIn && !showUserScreen && (
        <section className="movie-grid">
          <div className="grid-container">
            {displayedMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img src={movie.image} alt={movie.title} className="movie-image" />
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-description">{movie.description}</p>
                <button
                  className={`favorite-button ${movie.isFavorite ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(movie.id)}
                >
                  {movie.isFavorite ? '★' : '☆'}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;