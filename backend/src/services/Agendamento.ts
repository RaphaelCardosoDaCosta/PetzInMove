import { prisma } from "../../prisma/prisma";
import { agendamento, agendamentoSchemaRequest } from "../types/typeAgendamento";


class Agendamento {

    async create(body: agendamentoSchemaRequest) {
        const query = await prisma.agendamento.create({
            data: {
                name: body.name,
                phone: body.phone,
                date: body.date,
                time: body.time,
                service: { connect: { id: body.idService } }
            },
            include: { service: true }
        });
        return query;
    }
    async getAll() {
        const query = await prisma.agendamento.findMany({
            include: { service: true }
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
                name: body.name,
                phone: body.phone,
                date: body.date,
                time: body.time
            },
        });
        return {message: "updated!", query};
    }

}

export { Agendamento };