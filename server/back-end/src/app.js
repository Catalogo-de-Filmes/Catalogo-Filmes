const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();


// ✅ Habilita CORS para o front-end
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));



// 🔐 Middleware de Limite de Requisições
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 30, // Limite de 30 requisições por minuto
  message: 'Muitas requisições feitas em pouco tempo. Tente novamente em alguns instantes.'
});
app.use(limiter);


// ✅ Middleware para interpretar JSON
app.use(express.json());

// 📁 Rotas de cadastro
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// 📁 Rotas de autenticação
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// 📁 Rotas de logout
const logoutRoutes = require('./routes/logoutRoutes');
app.use('/api', logoutRoutes);

// 📁 Rotas para adicionar/remover/listar favoritos
const favoriteRoutes = require('./routes/favoriteRoutes');
app.use('/api', favoriteRoutes);

// 📁 Rotas de pesquisa de filmes
const filmeRoutes = require('./routes/filmRoutes');
app.use('/api', filmeRoutes);

// Exporta o app para ser usado no index.js
module.exports = app;
