const express = require('express');
const router = express.Router();
const { buscarFilmes, listarFilmesPorCategoria, buscarFilmePorId, buscarRecomendacoes } = require('../controllers/filmController');
const autenticarToken = require('../middlewares/auth');

router.get('/filmes/pesquisar', autenticarToken, buscarFilmes);

router.get('/filmes/por-categoria', listarFilmesPorCategoria);

router.get('/filmes/:id', buscarFilmePorId);

router.get('/filmes/:id/recomendados', buscarRecomendacoes);


module.exports = router;


