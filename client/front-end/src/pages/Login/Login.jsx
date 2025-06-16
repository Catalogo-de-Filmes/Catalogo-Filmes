import React, { useState } from 'react';
import './Login.css';
import api from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      console.error('Erro no login:', err.response?.data || err.message);
      alert('Login inválido');
    }

  };


  return (
    <div className="login-screen">
      <div className="header-bar">
        {/* <div className="menu-icon">☰</div> */}
        <div className="logo">
          <img src="../../images/CF.png" alt="Catálogo de Filmes" />
        </div>
      </div>

      <div className="login-container">
        <div className="login-box">
          <p className="title-login-box">Login</p>
          <form className="login-form" onSubmit={handleSubmit}>

            <input type="email" placeholder="E-mail" className="login-input"
              onChange={e => setFormData({ ...formData, email: e.target.value })} />

            <input type="password" placeholder="Senha" className="login-input"
              onChange={e => setFormData({ ...formData, senha: e.target.value })} />

            <button className="login-button">Entrar</button>

            <p >
              Ainda não tem uma conta? <Link className="link-text" to="./Cadastro">Cadastre-se</Link>
            </p>
          </form>
        </div>

        <div className="image">
          <img src="../../images/Logo catalogo de filmes.png" alt="Catálogo de Filmes" />
        </div>
      </div>
    </div>
  );
}
