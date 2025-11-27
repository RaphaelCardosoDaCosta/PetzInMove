import { Cadastro } from "../services/Cadastro";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { cadastrar, cadastroSchema } from "../types/typeCadastro";

export async function rotaCadastro(app: FastifyInstance) {
    app.post('/cadastro', async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const bodyParsed: cadastrar = cadastroSchema.parse(req.body);
            const resultado = await new Cadastro().create(bodyParsed);
            return reply.status(201).send(resultado);
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return reply.status(400).send({ message: 'Dados inválidos', errors: error.errors });
            }
            if (error.code === 'SQLITE_CONSTRAINT_UNIQUE' || error.meta?.target?.includes('email')) {
                return reply.status(409).send({ message: 'Email já cadastrado' });
            }
            app.log.error('Erro ao criar cadastro:', error);
            return reply.status(500).send({ 
                message: 'Erro ao criar cadastro',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    });

    app.get('/cadastro', async (req: FastifyRequest, reply: FastifyReply) => {
        return new Cadastro().getAll();
    });

    app.patch('/cadastro/:id', async (req: FastifyRequest, reply: FastifyReply) => {
        const instanceService = new Cadastro();
        const { id } = req.params as { id: string }
        const body: cadastrar = req.body as cadastrar;
        return await instanceService.update(body, id);
    });

    app.delete('/cadastro/:id', async (req: FastifyRequest, reply: FastifyReply) => {
        const instanceService = new Cadastro();
        const { id } = req.params as { id: string };
        return await instanceService.delete(id);
    });
}
