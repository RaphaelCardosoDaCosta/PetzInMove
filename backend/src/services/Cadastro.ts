import { encrypts } from "../utils/encrypt";
import { prisma } from "../../prisma/prisma";
import { cadastrar } from "../types/typeCadastro";

class Cadastro {
    async create(body: cadastrar) {
        const encryptSenha: string = await encrypts(body.senha);

        const query = await prisma.cadastro.create({
            data: {
                nome: body.nome,
                email: body.email,
                senha: encryptSenha
            }
        });
        return query;
    }
    async getAll() {
        const query = await prisma.cadastro.findMany();
        return query;
    }
    async delete(id: string) {
        const query = await prisma.cadastro.delete({
            where: {
                id: id
            }
        });
        return {message: "succesfully deleted!"}
    }
    async update(body: cadastrar , id: string) {
        const data = await prisma.cadastro.update({
            where: {
                id: id
            },
            data: {
                nome: body.nome,
                email: body.email,
                senha: body.senha
            }
        });
        return {message: "updated!", data}
    }

}

export { Cadastro }