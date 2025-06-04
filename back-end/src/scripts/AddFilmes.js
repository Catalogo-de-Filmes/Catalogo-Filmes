const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const novoFilme = await prisma.filme.create({
    data: {
      nome: "As Branquelas",
      descricao: "Dois irmãos agentes do FBI, Marcus e Kevin Copeland, acidentalmente evitam que bandidos sejam presos em uma apreensão de drogas. Como castigo, eles são forçados a escoltar um par de socialites nos Hamptons. Quando as meninas descobrem o plano da agência, elas se recusam a ir. Sem opções, Marcus e Kevin, dois homens negros, decidem fingir que são as irmãs e se transformam em um par de loiras.",
      avaliacao: 5.9,
      ondeAssistir: "Netflix", 
      capaUrl: "https://res.cloudinary.com/dlvgggjoc/image/upload/v1747935144/20534159_h4f2ex.jpg", // URL gerada pelo cloudnary
      usuario: {
        connect: { id: 1 } // Deixe esse msemo
      },
      categorias: {
        create: [ // Adicione as categoria(as) do filme a partir do ID da categoria na tabela categoria
            // ID de cada categoria: 1 - Ação; 2 - Animação; 3 - Aventura; 4 - Comédia; 5 - Documentário; 
            // 6 - Drama; 7 - Fantasia; 8 - Faroeste; 9 - Ficção Científica; 10 - Guerra; 11 - Musical;
            // 12 - Policial; 13 - Romance; 14 - Suspense; 15 - Terror;
          { categoria: { connect: { id: 4 } } }, // Adicione quantas linhas necessáras para as categorias
          { categoria: { connect: { id: 12 } } }  
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
