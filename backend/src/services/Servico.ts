import { prisma } from "../../prisma/prisma";
import { Servicos } from "../types/typeServico";

class Servico { 

    async create(body: Servicos) {
        const query = await prisma.servico.create({
            data: {
                title: body.title,
                description: body.description,
                price: body.price
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
                title: body.title,
                description: body.description,
                price: body.price
            }
        });
        return {message: "updated!", query};
    }
}

export { Servico };