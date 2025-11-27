import { FastifyInstance } from "fastify/types/instance";
import { agendamento, agendamentoSchema } from "../types/typeAgendamento";
import { Agendamento } from "../services/Agendamento";

export async function rotaAgendamento(app: FastifyInstance) {

    app.addHook('preHandler', async (request, reply) => {
        try {
            await request.jwtVerify();
        }
        catch (error) {
            reply.status(401).send({ error: 'Unauthorized: invalid token' });
        }
    });

    app.post('/agendamentos', async (req, reply) => {
        const bodyParser = agendamentoSchema.parse(req.body);
        const agendamentoInstace = new Agendamento();
        const agendamentoCriado = await agendamentoInstace.create(bodyParser);
        return reply.status(201).send({
            message: "Agendamento criado com sucesso.",
            data: agendamentoCriado
        });
    });
    app.get('/agendamentos', async (req, reply) => {
        const agendamentoInstace = new Agendamento();
        const agendamentos = await agendamentoInstace.getAll();
        return reply.send(agendamentos);
    });
    app.delete('/agendamentos/:id', async (req, reply) => {
        const { id } = req.params as { id: string };
        const agendamentoInstace = new Agendamento();
        await agendamentoInstace.delete(id);
        return reply.send({ message: "Agendamento deletado com sucesso." });
    });

    
    app.patch('/agendamentos/:id', async (req, reply) => {
        const { id } = req.params as { id: string };
        const bodyParser: agendamento = req.body as agendamento;
        const agendamentoInstace = new Agendamento();
        const agendamentoAtualizado = await agendamentoInstace.update(bodyParser, id);
        return reply.send({
            message: "Agendamento atualizado com sucesso.",
            data: agendamentoAtualizado
        });
    });
}
