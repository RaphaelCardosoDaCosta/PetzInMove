import { prisma } from "../../../prisma/prisma";
import { verifys } from "../../utils/encrypt";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { loginType, loginSchema } from "../../types/typeLogin";


export async function login(app: FastifyInstance) {
    app.post('/login', async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const bodyData: loginType = loginSchema.parse(req.body);
            const findCadastro = await prisma.cadastro.findFirst({
                where: {email: bodyData.email}
            });
            if(!findCadastro) {
                return reply.status(400).send({message: "user not found."})
            }
            const checkSenha = await verifys(bodyData.senha, findCadastro.password);
            if(!checkSenha) {
                return reply.status(400).send({message: "invalid password."});
            }
            const token = app.jwt.sign({id: findCadastro.id, email: findCadastro.email});
            return reply.status(200).send({message: "Welcome to PetzInMove API", token});
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return reply.status(400).send({ message: 'Dados inválidos', errors: error.errors });
            }
            app.log.error(error);
            return reply.status(500).send({ message: 'Erro ao realizar login' });
        }
    })};