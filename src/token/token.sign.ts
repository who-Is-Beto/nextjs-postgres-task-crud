import ENVS from "@/constants/envs";
import jwt from "jsonwebtoken";

function signToken(payload: any) {
  delete payload.password;
  return jwt.sign(payload, ENVS.secretTokenKey as string);
}

export default signToken;
