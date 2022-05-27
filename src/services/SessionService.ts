import verifyPassword from "@/auth/pass-verify";
import authMiddleWare from "@/middlewares/auth.handler";
import { serialize } from "cookie";
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

      const token = signToken({
        user,
        expirationTokenDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      });

      const serializeed = serialize("OutsideJWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 30
      });

      return res
        .setHeader("Set-Cookie", serializeed)
        .status(200)
        .json({
          message: `${user.username} is ${message}!`
        });
    } catch (error) {}
  }
}

export default SessionService;
