const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const novoFilme = await prisma.filme.create({
    data: {
      nome: "A Origem",
      descricao: "Um ladrão que invade os sonhos das pessoas para roubar segredos.",
      avaliacao: 8.8,
      ondeAssistir: "Netflix", 
      capaUrl: "https://res.cloudinary.com/seu-cloud/image/upload/v1234567890/a-origem.jpg", // URL gerada pelo cloudnary
      usuario: {
        connect: { id: 1 } // Deixe esse msemo
      },
      categorias: {
        create: [ // Adicione as categoria(as) do filme a partir do ID da categoria na tabela categoria
            // ID de cada categoria: 1 - Ação; 2 - 
          { categoria: { connect: { id: 1 } } }, // Ex: Ação
          { categoria: { connect: { id: 9 } } }  // Ex: Ficção Científica
        ]
      }
    }
  });

  console.log("Filme adicionado com sucesso:");
  console.log(novoFilme);
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
