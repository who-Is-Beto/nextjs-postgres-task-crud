import { NextApiRequest } from "next";

export default function authMiddleWare(req: NextApiRequest) {
  const { apikey } = req.headers;
  if (apikey === process.env.API_KEY) {
    return {
      message: "Authenticated",
      time: new Date().toISOString()
    };
  }
  return { message: "Invalid API key :c" };
}
