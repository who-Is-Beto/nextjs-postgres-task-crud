import UsersService from "@/services/Users/UsersService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const usersService = new UsersService();
  const users = await usersService.getUsers();

  return res.status(200).json({ users });
}
