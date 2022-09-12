import { NextApiRequest, NextApiResponse } from "next";
import { login } from "@/lib/auth";
import { authenticatedUser, logoutUser } from "@/web/tokens";
import defaultHandler from "../../_defaultHandler";

const handler = defaultHandler<NextApiRequest, NextApiResponse>()
  .post(async (req, res) => {
    const user = await login(req.body);

    if (user) {
      authenticatedUser(res, user);
      return res.status(200).json({ user, message: "User logged in successfully c:" });
    } else {
      return res.status(404).json({ message: "User not found :c" });
    }
  })
  .delete(async (_req, res) => {
    logoutUser(res);
    return res.status(201).json({ message: "Logout success" });
  });

export default handler;
