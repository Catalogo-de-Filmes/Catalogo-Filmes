const express = require('express');
const router = express.Router();
const {
  adicionarFavorito,
  removerFavorito,
  listarFavoritos
} = require('../controllers/favoriteController');

const autenticarToken = require('../middlewares/auth');

router.post('/:filmeId', autenticarToken, adicionarFavorito);
router.delete('/:filmeId', autenticarToken, removerFavorito);
router.get('/favoritos', autenticarToken, listarFavoritos);




module.exports = router;

