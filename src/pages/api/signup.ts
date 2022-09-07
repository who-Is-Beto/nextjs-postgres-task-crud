import UsersService from "@/services/Users/UsersService";
import type { NextApiRequest, NextApiResponse } from "next";
import authMiddleWare from "../../middlewares/auth.handler";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const usersService = new UsersService();
  const { authenticated } = authMiddleWare(req);
  if (req.method === "POST" && authenticated) {
    const { username, email, password } = req.body;
    try {
      const user = await usersService.createUser(username, email, password);
      return await res.status(201).json({ message: user });
    } catch (error) {
      return await res.status(500).json({ message: error });
    }
  }
  return res.status(402).json({ message: "Invalid method :c" });
}
