import verifyPassword from "@/auth/pass-verify";
import { serialize } from "cookie";
import signToken from "@/token/token.sign";
import { NextApiRequest, NextApiResponse } from "next";
import UsersService from "./Users/UsersService";
import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

class SessionService {
  constructor() {}

  public async logout(_: NextApiRequest, res: NextApiResponse) {
    try {
      const serializeed = serialize("OutsideJWT", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
        maxAge: 0
      });
      return res
        .setHeader("Set-Cookie", serializeed)
        .status(200)
        .json({ message: "Logout success", success: true });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong :c", success: false });
    }
  }

  public async createSession(req: NextApiRequest, res: NextApiResponse) {
    try {
      const usersService = new UsersService();
      const { email, password } = req.body;
      const user = await usersService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
      }
      const IsMatch = await verifyPassword(password, user.password);
      if (!IsMatch) {
        return res.status(401).json({ message: "Invalid password", success: false });
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
          message: `${user.username} is Authenticated!`,
          success: true,
          userName: user.username,
          jwt: serializeed
        });
    } catch (error) {}
  }
}

export default SessionService;
