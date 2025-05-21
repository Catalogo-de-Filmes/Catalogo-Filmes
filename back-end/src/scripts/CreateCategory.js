const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categorias = ['Ação', 'Comédia', 'Terror', 'Ficção Científica', 'Drama', 'Romance', 'Aventura', 'Animação', 'Suspense', 'Documentário', 'Faroeste', 'Fantasia', 'Musical', 'Guerra', 'Policial'];

  for (const nome of categorias) {
    await prisma.Categoria.upsert({
      where: { nome },
      update: {},
      create: { nome }
    });
  }

  console.log("Categorias inseridas com sucesso!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });