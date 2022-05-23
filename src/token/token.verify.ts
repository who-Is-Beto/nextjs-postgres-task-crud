import jwt from "jsonwebtoken";

function verifyToken(token: string) {
  return jwt.verify(token, process.env.SECRET_TOKEN_KEY as string);
}

export default verifyToken;
