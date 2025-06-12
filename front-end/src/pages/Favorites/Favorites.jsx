import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Favorites.css';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

export default function Favorites() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const filme = state?.filme;

  if (!filme) {
    return (
      <div className="favorites-empty">
        <p>Nenhum filme selecionado como favorito.</p>
        <button onClick={() => navigate(-1)} className="btn-back">
          ← Voltar
        </button>
      </div>
    );
  }

  const notaFormatada = parseFloat(filme.nota)
    .toFixed(1)
    .replace('.', ',') + '/10';

  return (
    <div className="favorites-page">
      <header className="fav-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Voltar
        </button>
        <h1 className="fav-title">Detalhes do Favorito</h1>
      </header>

      <div className="fav-card">
        <img src={filme.imagem} alt={filme.titulo} className="fav-cover" />
        <div className="fav-info">
          <h2 className="fav-movie-title">{filme.titulo}</h2>

          <div className="fav-tags">
            {filme.genero.split(',').map((g, i) => (
              <span key={i} className="fav-tag">{g.trim()}</span>
            ))}
          </div>

          <p className="fav-description">{filme.descricao}</p>

          <div className="fav-meta">
            <div className="fav-rating">
              <FaStar /> <strong>{notaFormatada}</strong>
            </div>
            <button
              className="btn-evaluate"
              onClick={() => alert('Funcionalidade de avaliar em breve!')}
            >
              ⭐ Avaliar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
