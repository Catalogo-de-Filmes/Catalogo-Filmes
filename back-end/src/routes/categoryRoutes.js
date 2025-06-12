const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// GET /api/categorias
router.get('/categorias', categoriaController.listarCategorias);

module.exports = router;
