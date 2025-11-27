import { prisma } from "../../prisma/prisma";
import { Servicos } from "../types/typeServico";

class Servico { 

    async create(body: Servicos) {
        const query = await prisma.servico.create({
            data: {
                title: body.nome,
                description: body.descricao,
                price: body.preco
            }
        });
        return {
            id: query.id,
            nome: query.title,
            descricao: query.description,
            preco: query.price
        };
    }

    async getAll() {
        const query = await prisma.servico.findMany();
        return query.map(servico => ({
            id: servico.id,
            nome: servico.title,
            descricao: servico.description,
            preco: servico.price
        }));
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
                title: body.nome,
                description: body.descricao,
                price: body.preco
            }
        });
        return {
            message: "updated!", 
            query: {
                id: query.id,
                nome: query.title,
                descricao: query.description,
                preco: query.price
            }
        };
    }
}

export { Servico };