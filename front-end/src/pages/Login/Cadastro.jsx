import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Reutilizando o CSS da página de login

export default function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuário cadastrado:', formData);
    navigate('/inicio'); // Redireciona para a tela inicial
  };

  return (
    <div className="login-screen">
      <div className="header-bar">
        <div className="menu-icon">☰</div>
        <div className="logo">CF</div>
        <div></div>
      </div>

      <div className="login-container">
        <div className="login-box">
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome"
              className="login-input"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              className="login-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className="login-input"
              value={formData.senha}
              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              required
            />
            <button className="login-button" type="submit">Cadastrar</button>
            <button
              type="button"
              className="login-button"
              onClick={() => navigate('/')}
              style={{ marginTop: '10px', backgroundColor: '#555' }}
            >
              Voltar para o login
            </button>
          </form>
        </div>

        <div className="carousel-box">
          <div className="carousel">
            <img src="https://source.unsplash.com/300x200/?sunset" alt="sunset" />
            <img src="https://source.unsplash.com/300x200/?car" alt="car" />
            <img src="https://source.unsplash.com/300x200/?nature" alt="nature" />
            <img src="https://source.unsplash.com/300x200/?ocean" alt="ocean" />
            <img src="https://source.unsplash.com/300x200/?movie" alt="movie" />
            <img src="https://source.unsplash.com/300x200/?camera" alt="camera" />
          </div>
        </div>
      </div>
    </div>
  );
}
