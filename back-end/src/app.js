const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();

// ✅ IMPORTA MIDDLEWARE
const autenticarToken = require('./middlewares/auth');

// 🔐 Limite de requisições
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: 'Muitas requisições feitas em pouco tempo. Tente novamente em alguns instantes.'
});
app.use(limiter);

// ✅ CORS e JSON
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// 📁 Rotas públicas
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', logoutRoutes);

// 📁 Rotas protegidas
const favoriteRoutes = require('./routes/favoriteRoutes');
const filmeRoutes = require('./routes/filmRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api', autenticarToken, favoriteRoutes);
app.use('/api', autenticarToken, filmeRoutes);
app.use('/api', autenticarToken, categoryRoutes);

// Exporta o app para ser usado no index.js
module.exports = app;
