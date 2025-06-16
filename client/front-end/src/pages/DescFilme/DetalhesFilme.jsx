import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import api from '../../services/api';
import './DetalhesFilme.css';

export default function DetalhesFilme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState(null);
  const [recomendados, setRecomendados] = useState([]);
  const [favorito, setFavorito] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarTudo = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // Buscar o filme e recomendados em paralelo
        const [resFilme, resRecomendados] = await Promise.all([
          api.get(`/filmes/${id}`, { headers }),
          api.get(`/filmes/${id}/recomendados`, { headers })
        ]);

        const filmeData = resFilme.data;
        setFilme(filmeData);
        setRecomendados(resRecomendados.data);

        // Buscar favoritos só se logado
        if (token) {
          const resFavoritos = await api.get('/favoritos', { headers });

          const ehFavorito = resFavoritos.data.some(filme => Number(filme.id) === Number(id));

          setFavorito(ehFavorito);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarTudo();
  }, [id]);

  const toggleFavorito = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert("Você precisa estar logado.");

    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (favorito) {
        await api.delete('/favoritos', {
          headers,
          data: { filmeId: Number(id) }
        });
        setFavorito(false);
      } else {
        await api.post('/favoritos', { filmeId: Number(id) }, { headers });
        setFavorito(true);
      }
    } catch (err) {
      console.error('Erro ao favoritar:', err);
      alert('Erro ao adicionar/remover dos favoritos');
    }
  };

  if (carregando || !filme) return <div className='loading-div'><img src="../images/Gif/loading.gif" alt="Carregando..." className="loading" /></div>;

  return (
    <div className="detalhes-filme">
      <header className="top-bar">
        <div className="logo"><img src="/images/CF.png" alt="Catálogo de Filmes" /></div>
        <button className="btn-back" onClick={() => navigate(-1)}>Voltar</button>
        <div></div>
      </header>

      <div className="detalhes-container">
        <img className="poster-filme" src={filme.capaUrl} alt={filme.nome} />

        <div className="info-filme">
          <h1>{filme.nome}</h1>
          <button
            className="estrela-botao"
            onClick={toggleFavorito}
            style={{ color: favorito ? '#FFD700' : '#fff' }}
            title={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <FaStar size={32} />
          </button>

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

      <div className="recomendados">
        <h2>Recomendados</h2>
        <div className="filmes-recomendados">
          {recomendados.map((rec) => (
            <div key={rec.id} className="recomendado-item">
                    <Link to={`/filme/${filme.id}`} key={`filme-${filme.id}`}
                      className="movie-item">
                      <img src={filme.capaUrl} alt={filme.nome} />
                      <p className="movie-title">{filme.nome}</p>
                    </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
