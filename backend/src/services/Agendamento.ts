import { prisma } from "../../prisma/prisma";
import { agendamento, agendamentoSchemaRequest } from "../types/typeAgendamento";


class Agendamento {

    async create(body: agendamentoSchemaRequest) {
        const query = await prisma.agendamento.create({
            data: {
                name: body.nome,
                phone: body.telefone,
                date: body.data,
                time: body.hora,
                service: { connect: { id: body.idServico } }
            },
            include: { service: true }
        });
        return {
            id: query.id,
            nome: query.name,
            telefone: query.phone,
            data: query.date,
            hora: query.time,
            servico: query.service ? {
                id: query.service.id,
                nome: query.service.title,
                descricao: query.service.description,
                preco: query.service.price
            } : undefined
        };
    }
    async getAll() {
        const query = await prisma.agendamento.findMany({
            include: { service: true }
        });
        return query.map(agendamento => ({
            id: agendamento.id,
            nome: agendamento.name,
            telefone: agendamento.phone,
            data: agendamento.date,
            hora: agendamento.time,
            servico: agendamento.service ? {
                id: agendamento.service.id,
                nome: agendamento.service.title,
                descricao: agendamento.service.description,
                preco: agendamento.service.price
            } : undefined
        }));

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
                name: body.nome,
                phone: body.telefone,
                date: body.data,
                time: body.hora
            },
        });
        return {
            message: "updated!", 
            query: {
                id: query.id,
                nome: query.name,
                telefone: query.phone,
                data: query.date,
                hora: query.time
            }
        };
    }

}

export { Agendamento };