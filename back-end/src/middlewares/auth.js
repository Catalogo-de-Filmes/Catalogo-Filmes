const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'chave-super-secreta';

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const usuario = jwt.verify(token, JWT_SECRET);
    req.user = usuario; // agora temos o id/email no req.user
    next();
  } catch (error) {
    return res.status(403).json({ erro: 'Token inválido' });
  }
}

module.exports = autenticarToken;
