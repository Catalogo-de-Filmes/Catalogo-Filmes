const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const buscarFilmes = async (req, res) => {
  const { nome, categoria } = req.query;

  // Validação
  if ((nome && typeof nome !== 'string') || (categoria && typeof categoria !== 'string')) {
    return res.status(400).json({ erro: 'Parâmetros inválidos' });
  }

  if ((nome && nome.length > 100) || (categoria && categoria.length > 100)) {
    return res.status(400).json({ erro: 'Texto de pesquisa muito longo' });
  }

  const filtros = [];

  if (nome) {
    filtros.push({
      nome: {
        contains: nome
      }
    });
  }

  if (categoria) {
    filtros.push({
      categoria: {
        nome: {
          contains: categoria
        }
      }
    });
  }

  try {
    const filmes = await prisma.filme.findMany({
      where: {
        AND: filtros
      },
      take: 20,
      include: { categorias: true }
    });

    res.json(filmes);
  } catch (error) {
    console.error('[ERRO BUSCA]', error);
    res.status(500).json({ erro: 'Erro ao buscar filmes' });
  }
};


module.exports = {
  buscarFilmes
};
