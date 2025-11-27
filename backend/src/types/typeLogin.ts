import { string, z } from "zod";

export const loginSchema = z.object({
    email: string().email(),
    senha: string()
});

export type loginType = z.infer<typeof loginSchema>;