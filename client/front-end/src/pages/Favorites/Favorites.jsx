import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Favorites.css';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import api from '../../services/api';


export default function Favorites() {

  useEffect(() => {
    const buscarFavoritos = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/favoritos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFilmesFavoritos(res.data);
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      } finally {
        setCarregando(false);
      }
    };

    buscarFavoritos();
  }, []);

  const [filmesFavoritos, setFilmesFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  const handleRemoverFavorito = async (filmeId) => {
    const confirm = window.confirm("Tem certeza que deseja remover dos favoritos?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete('/favoritos', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { filmeId }
      });

      // Atualiza a lista após remoção
      setFilmesFavoritos((prev) => prev.filter(f => f.id !== filmeId));
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      alert("Erro ao remover dos favoritos");
    }
  };



  if (carregando) {
    return <div className='loading-div'><img src="../images/Gif/loading.gif" alt="Carregando..." className="loading" /></div>;
  }

  if (filmesFavoritos.length === 0) {
    return (
      <div className="favorites-empty">
        <header className="top-bar">
          <div className="logo">
            <img src="../images/CF.png" alt="Catálogo de Filmes" />
          </div>
          <button className="btn-back" onClick={() => navigate('/home')}>Voltar</button>
        </header>
        <p>Você ainda não favoritou nenhum filme.</p>
      </div>
    );
  }


  return (
    <div className="favorites-page">
      <header className="top-bar">
        <div className="logo">
          <img src="../images/CF.png" alt="Catálogo de Filmes" />
        </div>
        <button className="btn-back" onClick={() => navigate('/home')}>Voltar</button>
      </header>

      <h1 className="favorites-title">Meus Filmes Favoritos</h1>

      <div className="fav-list">
        {filmesFavoritos.map((filme) => (
          <Link to={`/filme/${filme.id}`} key={filme.id} className="fav-card-link">

            <div className="fav-card">
              <img
                src={filme.capaUrl}
                alt={filme.nome}
                className="fav-cover"
              />
              <div className="fav-info">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 className="fav-movie-title">{filme.nome}</h2>
                  <FaStar
                    onClick={(e) => {
                      e.stopPropagation(); // impede o clique de acionar o Link
                      e.preventDefault();  // impede redirecionamento do Link
                      handleRemoverFavorito(filme.id);
                    }}
                  size={24}
                  style={{ cursor: 'pointer', color: '#FFD700', marginLeft: '10px' }}
                  title="Remover dos favoritos"
                  />
                </div>

                <div className="nota">
                  <p className='nota-titulo'>Avaliação: </p>
                  <p className='nota2'>{filme.avaliacao ? filme.avaliacao.toFixed(1) : 'N/A'}/10</p>
                </div>

                <div className="onde-assistir">
                  <p className='onde-assistir-titulo'>Onde assistir:</p>
                  <p className='onde-assistir-info'>{filme.ondeAssistir || 'N/A'}</p>
                </div>

                <div className="descricao">
                  <p className='sinopse'>Sinopse:</p>
                  <p className='sinopse-info'>{filme.descricao}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

}