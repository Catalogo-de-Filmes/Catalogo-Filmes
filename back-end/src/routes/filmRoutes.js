const express = require('express');
const router = express.Router();
const { buscarFilmes } = require('../controllers/filmController');
const autenticarToken = require('../middlewares/auth');

router.get('/filmes/pesquisar', autenticarToken, buscarFilmes);

module.exports = router;


