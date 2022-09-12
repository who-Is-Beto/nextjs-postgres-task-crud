import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "@/lib/users";
import { authenticatedUser } from "@/web/tokens";
import defaultHandler from "@/pages/_defaultHandler";

const handler = defaultHandler<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  const user = await createUser(req.body);

  if (user) {
    authenticatedUser(res, user);
    return res.status(201).json({ user, message: "User created successfully c:" });
  } else {
    return res.status(400).json({ message: "User already exists :c" });
  }
});

export default handler;
