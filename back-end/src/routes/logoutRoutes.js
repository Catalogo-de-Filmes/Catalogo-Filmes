const express = require('express');
const router = express.Router();
const { logout } = require('../controllers/logoutController');
const autenticarToken = require('../middlewares/auth');

router.post('/logout', autenticarToken, logout);

module.exports = router;
