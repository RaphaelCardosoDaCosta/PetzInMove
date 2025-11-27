import { prisma } from "../prisma/prisma";

async function main() {
  const cadastros = await prisma.cadastro.findMany();
  const servicos = await prisma.servico.findMany();
  const agendamentos = await prisma.agendamento.findMany({ include: { service: true } });

  console.log(JSON.stringify({ cadastros, servicos, agendamentos }, null, 2));
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
