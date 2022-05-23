import jwt from "jsonwebtoken";

function signToken(payload: any) {
  delete payload.password;
  return jwt.sign(payload, process.env.SECRET_TOKEN_KEY as string);
}

export default signToken;
