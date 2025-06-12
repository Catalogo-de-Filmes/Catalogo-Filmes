import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-screen">
      <header className="profile-header">
        <button className="menu-button">☰</button>
        <div className="logo">CF</div>
        <button className="search-button">🔍</button>
      </header>

      <main className="profile-content">
        <div className="user-avatar">
          <img src="/images/default-avatar.png" alt="Foto do usuário" />
          <div className="username">nome usuário</div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
