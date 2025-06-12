import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaArrowLeft } from 'react-icons/fa';
import './Favorites.css';  // usamos o mesmo CSS de Favorites

export default function DetalhesFilme({ filme }) {
  // Se não receber via props, pode buscar via location.state
  const navigate = useNavigate();
  const data = filme || {};  
  const {
    titulo = 'Título não disponível',
    genero = 'Gênero não disponível',
    descricao = 'Descrição não disponível',
    nota = '0.0',
    imagem = 'https://via.placeholder.com/250x350?text=Sem+Capa',
  } = data;

  const [favorito, setFavorito] = useState(false);
  const notaFormatada = parseFloat(nota).toFixed(1).replace('.', ',') + '/10';

  return (
    <div className="favorites-page">
      <header className="fav-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Voltar
        </button>
        <h1 className="fav-title">Detalhes do Filme</h1>
      </header>

      <div className="fav-card">
        <img src={imagem} alt={titulo} className="fav-cover" />

        <div className="fav-info">
          <h2 className="fav-movie-title">{titulo}</h2>

          <div className="fav-tags">
            {genero.split(',').map((g, i) => (
              <span key={i} className="fav-tag">{g.trim()}</span>
            ))}
          </div>

          <p className="fav-description">{descricao}</p>

          <div className="fav-meta">
            <div className="fav-rating">
              <FaStar
                className="fav-star-icon"
                color={favorito ? '#FFD700' : '#555'}
                onClick={() => setFavorito(!favorito)}
              />
              <strong>{notaFormatada}</strong>
            </div>
          </div>
        </div>
      </div>

      <section className="recomendados">
        <h2>Recomendados</h2>
        <div className="filmes-recomendados">
          <img src="https://via.placeholder.com/150x220?text=Recomendado+1" alt="Recomendado 1" />
          <img src="https://via.placeholder.com/150x220?text=Recomendado+2" alt="Recomendado 2" />
          <img src="https://via.placeholder.com/150x220?text=Recomendado+3" alt="Recomendado 3" />
          <img src="https://via.placeholder.com/150x220?text=Recomendado+4" alt="Recomendado 4" />
        </div>
      </section>
    </div>
  );
}
