const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function adicionarFavorito(req, res) {
  const { filmeId } = req.body;
  const usuarioId = req.user.id;

  try {
    const existente = await prisma.favorito.findUnique({
      where: {
        usuarioId_filmeId: { usuarioId, filmeId }
      }
    });

    if (existente) {
      return res.status(400).json({ erro: 'Filme já está nos favoritos' });
    }

    const favorito = await prisma.favorito.create({
      data: {
        usuarioId,
        filmeId
      }
    });

    res.status(201).json({ mensagem: 'Favorito adicionado', favorito });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao adicionar favorito' });
  }
}


async function removerFavorito(req, res) {
  const { filmeId } = req.body;
  const usuarioId = req.user.id;

  try {
    await prisma.favorito.delete({
      where: {
        usuarioId_filmeId: { usuarioId, filmeId }
      }
    });

    res.status(200).json({ mensagem: 'Favorito removido' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover favorito' });
  }
}

const listarFavoritos = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const favoritos = await prisma.favorito.findMany({
      where: { usuarioId },
      include: {
        filme: true,
      },
    });

    const filmes = favoritos.map(f => f.filme); // <-- extrai só os filmes

    res.json(filmes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar favoritos' });
  }
};



module.exports = {
  adicionarFavorito,
  removerFavorito,
  listarFavoritos
};
