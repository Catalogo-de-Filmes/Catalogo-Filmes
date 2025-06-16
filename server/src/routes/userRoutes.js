const express = require('express');
const router = express.Router();
const { criarUsuario } = require('../controllers/userController');
const validateUserInput = require('../middlewares/validateUserInput');

router.post('/users', validateUserInput, criarUsuario);

module.exports = router;
