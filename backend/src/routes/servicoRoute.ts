import { FastifyInstance } from "fastify";
import { Servico } from "../services/Servico";
import { servicoSchema } from "../types/typeServico";

export async function rotaServico(app: FastifyInstance) {

    app.post("/servico", async (req, reply) => {
        const body = servicoSchema.parse(req.body);
        const servicoInstance = new Servico();
        return await servicoInstance.create(body);
    });

    app.get("/servico", async (req, reply) => {
        const servicoInstance = new Servico();
        return await servicoInstance.getAll();

    });

    app.patch("/servico/:id", async (req, reply) => {

        const { id } = req.params as { id: number };
        const body = servicoSchema.parse(req.body);
        const servicoInstance = new Servico();
        return await servicoInstance.update(Number(id), body);

    });

    app.delete("/servico/:id", async (req, reply) => {

        const { id } = req.params as { id: number };
        const servicoInstance = new Servico();
        return await servicoInstance.delete(Number(id));

    });

}