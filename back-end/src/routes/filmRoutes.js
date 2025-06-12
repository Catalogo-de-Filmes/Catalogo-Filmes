const express = require('express');
const router = express.Router();
const { buscarFilmes, criarFilme } = require('../controllers/filmController');
const autenticarToken = require('../middlewares/auth');

// Buscar filmes
router.get('/filmes/pesquisar', autenticarToken, buscarFilmes);

// Criar novo filme
router.post('/filmes', autenticarToken, criarFilme);

module.exports = router;
