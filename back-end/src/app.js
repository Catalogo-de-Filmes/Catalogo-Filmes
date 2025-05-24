// Rotas de cadastramento
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api', userRoutes);

module.exports = app;


// Rotas de autenticação
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);


// Rotas Adicionar/Remover/Listar filmes favoritos
const favoriteRoutes = require('./routes/favoriteRoutes');
app.use('/api', favoriteRoutes);
