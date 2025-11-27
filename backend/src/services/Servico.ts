import { prisma } from "../../prisma/prisma";
import { Servicos } from "../types/typeServico";

class Servico { 

    async create(body: Servicos) {
        const query = await prisma.servico.create({
            data: {
                nome: body.nome,
                descricao: body.descricao,
                preco: body.preco
            }
        });
        return query;
    }

    async getAll() {
        const query = await prisma.servico.findMany();
        return query;
    }

    async delete(id: number) {
        const query = await prisma.servico.delete({
            where: { id: id }
        });
        return {message: "Successfully deleted!"};
    }

    async update(id: number, body: Servicos) {
        const query = await prisma.servico.update({
            where: { id: id },
            data: {
                nome: body.nome,
                descricao: body.descricao,
                preco: body.preco
            }
        });
        return {message: "updated!", query};
    }
}

export { Servico };