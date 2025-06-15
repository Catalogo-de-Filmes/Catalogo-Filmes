import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-screen">
      <header className="profile-header">
        <div className="logo">
          <img src="../images/CF.png" alt="Catálogo de Filmes" />
        </div>
        <button className="search-button" onClick={() => navigate('/home')}>
          Voltar
        </button>
      </header>

      <main className="profile-content">
        <div className="user-avatar">
          <img src="../images/CF.png" alt="Foto do usuário" />
          <div className="username">nome usuário</div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
