import UsersService from "@/services/Users/UsersService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { name }
  } = req;
  const usersService = new UsersService();
  const user = await usersService.getUserByName(name as string);

  return res.status(200).json({ user });
}
