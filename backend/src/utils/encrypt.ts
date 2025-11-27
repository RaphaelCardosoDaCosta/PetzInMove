import { compare, hashSync } from "bcryptjs";


export async function encrypts(password: string): Promise<string> {
    return hashSync(password);
}

export async function verifys(passwordGot: string, passwordDb: string): Promise<boolean> {
    return compare(passwordGot, passwordDb);
}