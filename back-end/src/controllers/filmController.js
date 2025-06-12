const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const buscarFilmes = async (req, res) => {
  const { nome, categoria } = req.query;

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

// 🔽 Função adicionada para criar um novo filme
const criarFilme = async (req, res) => {
  try {
    const { nome, descricao, avaliacao, ondeAssistir, capaUrl, usuarioId, categoriasIds } = req.body;

    const novoFilme = await prisma.filme.create({
      data: {
        nome,
        descricao,
        avaliacao,
        ondeAssistir,
        capaUrl,
        usuario: { connect: { id: usuarioId } },
        categorias: {
          create: categoriasIds.map(id => ({
            categoria: { connect: { id } }
          }))
        }
      },
      include: {
        categorias: true
      }
    });

    res.status(201).json(novoFilme);
  } catch (error) {
    console.error("Erro ao criar filme:", error);
    res.status(500).json({ erro: "Erro ao criar filme" });
  }
};

module.exports = {
  buscarFilmes,
  criarFilme
};
