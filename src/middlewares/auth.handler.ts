import { NextApiRequest } from "next";

export default function authMiddleWare(req: NextApiRequest) {
  const { apikey } = req.headers;
  if (apikey === process.env.API_KEY) {
    return {
      authenticated: true,
      time: new Date().toISOString(),
      message: "Authenticated"
    };
  }
  return {
    authenticated: false,
    time: new Date().toISOString(),
    message: "Invalid API key :c"
  };
}
