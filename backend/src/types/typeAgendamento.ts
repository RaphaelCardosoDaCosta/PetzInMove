import  { z, ZodSchema } from "zod";
import { servicoSchema } from "./typeServico";

export const agendamentoSchema = z.object({
    id: z.string().uuid().optional(),
    nome: z.string().min(3),
    telefone: z.string().min(6),
    servico: z.array(z.lazy((): ZodSchema => servicoSchema)).optional(),
    data: z.string(),
    hora: z.string(),
    idServico: z.number().optional()
});

export type agendamento = z.infer<typeof agendamentoSchema>;

export const agendamentoSchemaRequest = agendamentoSchema.omit({ id: true });

export type agendamentoSchemaRequest = z.infer<typeof agendamentoSchemaRequest>;