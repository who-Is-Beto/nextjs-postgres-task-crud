import type { NextApiRequest, NextApiResponse } from "next";
import authMiddleWare from "../../middlewares/auth.handler";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log(authMiddleWare(req));
    return res.status(200).json({ message: req.body });
  }
  return res.status(402).json({ message: "Invalid method :c" });
}
