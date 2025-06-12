const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Lista todas as categorias cadastradas
const listarCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: { nome: 'asc' } // opcional: ordena por nome
    });
    res.json(categorias);
  } catch (error) {
    console.error('[ERRO AO LISTAR CATEGORIAS]', error);
    res.status(500).json({ erro: 'Erro ao buscar categorias' });
  }
};

module.exports = {
  listarCategorias
};
