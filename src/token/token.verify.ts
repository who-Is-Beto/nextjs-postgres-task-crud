import ENVS from "@/constants/envs";
import jwt from "jsonwebtoken";

function verifyToken(token: string) {
  return jwt.verify(token, ENVS.secretTokenKey as string);
}

export default verifyToken;
