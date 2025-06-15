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
      categorias: {
        some: {
          categoria: {
            nome: {
              contains: categoria
            }
          }
        }
      }
    });
  }


  try {
    const filmes = await prisma.filme.findMany({
      where: {
        OR: filtros
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

const listarFilmesPorCategoria = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany({
      include: {
        filmes: {
          include: {
            filme: true
          }
        }
      }
    });

    const resultado = categorias.map(categoria => ({
      nome: categoria.nome,
      filmes: categoria.filmes.map(cf => ({
        id: cf.filme.id,
        nome: cf.filme.nome,
        nota: cf.filme.avaliacao,
        capaUrl: cf.filme.capaUrl
      }))
    }));

    res.json(resultado);
  } catch (error) {
    console.error('[ERRO AO LISTAR FILMES POR CATEGORIA]', error);
    res.status(500).json({ erro: 'Erro ao buscar filmes por categoria' });
  }
};

const buscarFilmePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const filme = await prisma.filme.findUnique({
      where: { id: parseInt(id) },
    });

    if (!filme) {
      return res.status(404).json({ erro: 'Filme não encontrado' });
    }

    res.json(filme);
  } catch (error) {
    console.error('[ERRO BUSCAR FILME POR ID]', error);
    res.status(500).json({ erro: 'Erro ao buscar filme' });
  }
};

const buscarRecomendacoes = async (req, res) => {
  const { id } = req.params;

  try {
    const filmeAtual = await prisma.filme.findUnique({
      where: { id: parseInt(id) },
      include: {
        categorias: {
          include: {
            categoria: true
          }
        }
      }
    });

    if (!filmeAtual) {
      return res.status(404).json({ erro: 'Filme não encontrado' });
    }

    // Pega os IDs das categorias do filme atual
    const categoriaIds = filmeAtual.categorias.map(c => c.categoriaId);

    const recomendados = await prisma.filme.findMany({
      where: {
        id: { not: filmeAtual.id },
        categorias: {
          some: {
            categoriaId: { in: categoriaIds }
          }
        }
      },
      take: 4
    });

    res.json(recomendados);
  } catch (error) {
    console.error('[ERRO AO BUSCAR RECOMENDADOS]', error);
    res.status(500).json({ erro: 'Erro ao buscar recomendações' });
  }
};




module.exports = {
  buscarFilmes,
  listarFilmesPorCategoria,
  buscarFilmePorId,
  buscarRecomendacoes
};
