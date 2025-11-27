import { FastifyInstance } from "fastify/types/instance";
import { agendamento, agendamentoSchema } from "../types/typeAgendamento";
import { Agendamento } from "../services/Agendamento";

export async function rotaAgendamento(app: FastifyInstance) {

    app.addHook('preHandler', async (request, reply) => {
        // Middleware logic here (e.g., authentication, logging)
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
        const agendamentos = await agendamentoInstace.create(bodyParser);
        return reply.send("agendamento criado");
    });
    app.get('/agendamentos', async (req, reply) => {
        const agendamentoInstace = new Agendamento();
        const agendamentos = await agendamentoInstace.getAll();
        return reply.send(agendamentos);
    });
    app.delete('/agendamentos/:id', async (req, reply) => {
        const { id } = req.params as { id: string };
        const agendamentoInstace = new Agendamento();
        const agendamentos = await agendamentoInstace.delete(id);
        return reply.send("agendamento deletado");
    });

    
    app.patch('/agendamentos/:id', async (req, reply) => {
        const { id } = req.params as { id: string };
        const bodyParser: agendamento = req.body as agendamento;
        const agendamentoInstace = new Agendamento();
        const agendamentos = await agendamentoInstace.update(bodyParser, id);
        return reply.send("agendamento atualizado " + agendamentos);
    });
}