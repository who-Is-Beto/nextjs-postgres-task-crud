import bcrypt from "bcrypt";

export async function encryptPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  const match = await bcrypt.compare(password, hash);
  return match;
}
