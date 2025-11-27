import { encrypts } from "../utils/encrypt";
import { prisma } from "../../prisma/prisma";
import { cadastrar } from "../types/typeCadastro";

class Cadastro {
    async create(body: cadastrar) {
        const encryptSenha: string = await encrypts(body.senha);

        const query = await prisma.cadastro.create({
            data: {
                name: body.nome,
                email: body.email,
                password: encryptSenha
            }
        });
        return {
            id: query.id,
            nome: query.name,
            email: query.email
        };
    }
    async getAll() {
        const query = await prisma.cadastro.findMany();
        return query.map(cadastro => ({
            id: cadastro.id,
            nome: cadastro.name,
            email: cadastro.email
        }));
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
        const encryptSenha: string = await encrypts(body.senha);
        const data = await prisma.cadastro.update({
            where: {
                id: id
            },
            data: {
                name: body.nome,
                email: body.email,
                password: encryptSenha
            }
        });
        return {
            message: "updated!", 
            data: {
                id: data.id,
                nome: data.name,
                email: data.email
            }
        };
    }

}

export { Cadastro }