const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

async function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  try {

    const estaNaBlacklist = await prisma.tokenBlacklist.findUnique({
      where: { token },
    });

    if (estaNaBlacklist) {
      return res.status(403).json({ erro: "Token expirado ou inválido" });
    }

    const usuario = jwt.verify(token, JWT_SECRET);
    req.user = usuario;
    next();
  } catch (error) {
    console.log("[Erro na verificação do JWT]", error);

    return res.status(403).json({ erro: "Token inválido" });
  }
}

module.exports = autenticarToken;
