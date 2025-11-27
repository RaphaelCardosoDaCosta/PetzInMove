import  { z, ZodSchema } from "zod";
import { servicoSchema } from "./typeServico";

export const agendamentoSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(3),
    phone: z.string().min(6),
    service: z.array(z.lazy((): ZodSchema => servicoSchema)).optional(),
    date: z.string(),
    time: z.string(),
    idService: z.number().optional()
});

export type agendamento = z.infer<typeof agendamentoSchema>;

export const agendamentoSchemaRequest = agendamentoSchema.omit({ id: true });

export type agendamentoSchemaRequest = z.infer<typeof agendamentoSchemaRequest>;