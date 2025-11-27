import { prisma } from "../prisma/prisma";

async function main() {
  console.log("Inserindo servicos padrao...");

  const servicos = [
    {
      title: "Banho e Tosa",
      description: "Banho completo, tosa higienica ou estetica",
      price: 80.0,
    },
    {
      title: "Consulta Veterinaria",
      description: "Check-up completo, vacinacao e orientacoes de saude",
      price: 150.0,
    },
    {
      title: "Cortar Unha",
      description: "Apenas em animais docois",
      price: 80.55,
    },
    {
      title: "Day Spa Pet",
      description: "Tratamento premium com massagem, hidratacao e muito mais",
      price: 200.0,
    },
  ];

  for (const servico of servicos) {
    const existing = await prisma.servico.findFirst({
      where: { title: servico.title },
    });

    if (!existing) {
      const created = await prisma.servico.create({
        data: servico,
      });
      console.log(`Servico criado: ${created.title} (ID: ${created.id})`);
    } else {
      console.log(`Servico ja existe: ${servico.title} (ID: ${existing.id})`);
    }
  }

  const allServicos = await prisma.servico.findMany();
  console.log(`\nTotal de servicos no banco: ${allServicos.length}`);
}

main()
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
