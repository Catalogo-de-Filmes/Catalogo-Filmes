import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom'; // para navegação sem recarregar a página

export default function Login() {
  return (
    <div className="login-screen">
      <div className="header-bar">
        <div className="menu-icon">☰</div>
        <div className="logo">CF</div>
        <div></div>
      </div>

      <div className="login-container">
        <div className="login-box">
          <form className="login-form">
            <input type="text" placeholder="Nome de usuário" className="login-input" />
            <input type="password" placeholder="Senha" className="login-input" />
            <input type="email" placeholder="E-mail" className="login-input" />
            <button className="login-button">Entrar</button>

            <p className="link-text">
              Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
            </p>
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
