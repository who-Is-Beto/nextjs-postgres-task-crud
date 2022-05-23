import verifyPassword from "@/auth/pass-verify";
import authMiddleWare from "@/middlewares/auth.handler";
import signToken from "@/token/token.sign";
import { NextApiRequest, NextApiResponse } from "next";
import UsersService from "./Users/UsersService";

class SessionService {
  constructor() {}

  public async createSession(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { authenticated, message } = await authMiddleWare(req);
      if (!authenticated) {
        return res.status(406).json({ message });
      }
      const usersService = new UsersService();
      const { email, password } = req.body;
      const user = await usersService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const IsMatch = await verifyPassword(password, user.password);
      if (!IsMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      return res.status(200).json({ message: message, token: signToken(req.body) });
    } catch (error) {}
  }
}

export default SessionService;
