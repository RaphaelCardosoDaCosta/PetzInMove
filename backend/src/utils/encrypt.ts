import { compare, hash } from "bcryptjs";


export async function encrypts(password: string): Promise<string> {
    return await hash(password, 10);
}

export async function verifys(passwordGot: string, passwordDb: string): Promise<boolean> {
    return compare(passwordGot, passwordDb);
}