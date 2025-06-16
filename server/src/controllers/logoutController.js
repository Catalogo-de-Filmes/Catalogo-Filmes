const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function logout(req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(400).json({ erro: 'Token não fornecido' });

  try {
    await prisma.tokenBlacklist.create({
      data: { token }
    });

    res.status(200).json({ mensagem: 'Logout realizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao realizar logout' });
  }
}

module.exports = { logout };
