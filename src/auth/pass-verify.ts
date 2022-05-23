import bcrypt from "bcrypt";

async function verifyPassword(password: string, hash: string) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

export default verifyPassword;
