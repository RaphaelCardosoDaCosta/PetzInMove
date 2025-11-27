import { string, z } from "zod";


const envSchema = z.object({
    DATABASE_URL: string().url(),
    SECRET: string()
});

export const env = envSchema.parse(process.env);