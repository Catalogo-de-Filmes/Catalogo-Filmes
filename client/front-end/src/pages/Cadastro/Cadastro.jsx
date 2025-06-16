import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';
import api from '../../services/api';

export default function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', formData);
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className="login-screen">
      <div className="header-bar">
        {/* <div className="menu-icon">☰</div> */}
        <div className="logo">
          <img src="../images/CF.png" alt="Catálogo de Filmes" />
        </div>
      </div>

      <div className="login-container">
        <div className="login-box">
          <p className="title-login-box">Realize seu cadastro</p>
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
            >
              Voltar para o login
            </button>
          </form>
        </div>

        <div className="image">
          <img src="../images/Logo catalogo de filmes.png" alt="Catálogo de Filmes" />
        </div>
      </div>
    </div>
  );
}
