import { prisma } from "../../prisma/prisma";
import { agendamento, agendamentoSchemaRequest } from "../types/typeAgendamento";


class Agendamento {

    async create(body: agendamentoSchemaRequest) {
        const query = await prisma.agendamento.create({
            data: {
                nome: body.nome,
                telefone: body.telefone,
                data: body.data,
                hora: body.hora,
                servico: { connect: { id: body.idServico } }
            },
            include: { servico: true }
        });
        return query;
    }
    async getAll() {
        const query = await prisma.agendamento.findMany({
            include: { servico: true }
        });
        return query;

    }
    async delete(id: string) {
        const query = await prisma.agendamento.delete({
            where: { id: id }
        });
        return {message: "Successfully deleted!"};
    }
    async update(body: agendamento, id: string) {
        const query = await prisma.agendamento.update({
            where: { id: id },
            data: {
                nome: body.nome,
                telefone: body.telefone,
                data: body.data,
                hora: body.hora
            },
        });
        return {message: "updated!", query};
    }

}

export { Agendamento };