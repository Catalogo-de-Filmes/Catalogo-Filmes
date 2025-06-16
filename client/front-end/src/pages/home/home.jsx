import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './home.css';

export default function Home() {
  const [categorias, setCategorias] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [termo, setTermo] = useState('');
  const navigate = useNavigate();

  // Carrega carrosséis por categoria (padrão)
  const carregarFilmesPorCategoria = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await api.get('/filmes/por-categoria', { headers });
      setCategorias(response.data);
      setFilmes([]); // Limpa os resultados da pesquisa
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const timeout = setTimeout(async () => {
      if (!termo.trim()) {
        carregarFilmesPorCategoria();
        return;
      }

      try {
        const response = await api.get('/filmes/pesquisar', {
          headers,
          params: {
            nome: termo,
            categoria: termo
          }
        });
        setFilmes(response.data);
        setCategorias([]); // Oculta carrosséis
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    }, 500); // espera 500ms após parar de digitar

    return () => clearTimeout(timeout); // limpa timeout anterior
  }, [termo]);


  const handleLogout = () => {
    const token = localStorage.getItem('token');
    api.post('/auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).finally(() => {
      localStorage.removeItem('token');
      navigate('/');
    });
  };

  return (
    <div className="home-container">
      <aside className="side-menu">
        <button onClick={() => navigate('/favoritos')}>Favoritos</button>
        <button onClick={handleLogout}>Sair</button>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div className="logo"><img src="/images/CF.png" alt="Logo" /></div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Buscar filmes..."
              value={termo}
              className='search-input'
              onChange={(e) => setTermo(e.target.value)}
            />
          </div>
        </header>

        {termo ? (
          <>
            <h2>Resultados para: "{termo}"</h2>
            <div className="movie-grid">
              {filmes.map((filme) => (
                <Link to={`/filme/${filme.id}`} key={filme.id} className="movie-item">
                  <img src={filme.capaUrl} alt={filme.nome} />
                  <p className="movie-title">{filme.nome}</p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          categorias
            .filter((categoria) => categoria.filmes.length > 0)
            .map((categoria) => (

              <section key={categoria.id} className="genre-section">
                <h2>{categoria.nome}</h2>
                <div className="movie-grid">
                  {categoria.filmes.map((filme) => (
                    <Link to={`/filme/${filme.id}`} key={`filme-${filme.id}`}
                      className="movie-item">
                      <img src={filme.capaUrl} alt={filme.nome} />
                      <p className="movie-title">{filme.nome}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ))
        )}
      </main>
    </div>
  );
}
