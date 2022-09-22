import { NextApiRequest, NextApiResponse } from "next";
import { createUser, updateUser } from "@/lib/users";
import { authenticatedUser, userFromRequest } from "@/web/tokens";
import defaultHandler from "@/pages/_defaultHandler";

const handler = defaultHandler<NextApiRequest, NextApiResponse>()
  .post(async (req, res) => {
    const user = await createUser(req.body);

    if (user) {
      authenticatedUser(res, user);
      return res.status(201).json({ user, message: "User created successfully c:" });
    } else {
      return res.status(400).json({ message: "User already exists :c" });
    }
  })
  .put(async (req, res) => {
    const user = await userFromRequest(req);

    if (user) {
      const userUpdated = await updateUser(req.body);
      return res.status(201).json({ user: userUpdated, message: "User updated successfully c:" });
    } else {
      return res.status(400).json({
        message: "Something in your data are wrong, please verify your data or try it later. :c"
      });
    }
  });

export default handler;
