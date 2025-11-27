import { prisma } from "../../../prisma/prisma";
import { verifys } from "../../utils/encrypt";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { loginType, loginSchema } from "../../types/typeLogin";


export async function login(app: FastifyInstance) {
    app.post('/login', async (req: FastifyRequest, reply: FastifyReply) => {
        const bodyData: loginType = loginSchema.parse(req.body);
        const findCadastro = await prisma.cadastro.findFirst({
            where: {email: bodyData.email}
        });
        if(!findCadastro) {
            return reply.status(400).send({message: "user not found."})
        }
        const checkSenha = await verifys(bodyData.senha, findCadastro.senha);
        if(!checkSenha) {
            return reply.status(400).send({messege: "invalid password."});
        }
        const token = app.jwt.sign({id: findCadastro.id, email: findCadastro.email, senha: findCadastro.senha});
        return reply.status(200).send({message: "Welcome to PetzInMove API", token});
    })};