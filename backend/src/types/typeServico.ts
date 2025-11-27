import { z } from "zod";
import { agendamentoSchema } from "./typeAgendamento";


export const servicoSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(500),
    price: z.union([
        z.number(),
        z.string().transform((val) => parseFloat(val)),
    ]),
    agendamentos: z.array(z.lazy((): z.ZodSchema => agendamentoSchema )).optional()

});

export type Servicos = z.infer<typeof servicoSchema>;