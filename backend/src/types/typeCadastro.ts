import { z } from "zod";


export const cadastroSchema = z.object({
    id: z.string().uuid().optional(),
    nome: z.string().min(3).max(100),
    email: z.string().email(),
    senha: z.string().min(4),
});

export type cadastrar = z.infer<typeof cadastroSchema>;