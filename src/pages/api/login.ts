import authMiddleWare from "@/middlewares/auth.handler";
import SessionService from "@/services/SessionService";
import type { NextApiRequest, NextApiResponse } from "next";
const session = new SessionService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authenticated, message } = authMiddleWare(req);
  if (authenticated) {
    if (req.method === "POST") {
      return session.createSession(req, res);
    }
    return res.status(402).json({ message: "Invalid method :c" });
  }
  return res.status(406).json({ message });
}
