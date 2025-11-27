-- CreateTable
CREATE TABLE "Agendamento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "servico" TEXT NOT NULL,
    "dataAgendamento" TEXT NOT NULL,
    "horaMarcada" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cadastro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cadastro_email_key" ON "Cadastro"("email");
