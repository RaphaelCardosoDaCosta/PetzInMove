import { z } from "zod";


export const cadastroSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(4),
});

export type cadastrar = z.infer<typeof cadastroSchema>;