import { getTasks } from "@/lib/tasks";
import defaultHandler from "@/pages/_defaultHandler";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = defaultHandler<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const tasks = await getTasks({ userId: Number(req.query.id) });
  if (tasks) {
    return res.status(200).json({ tasks, message: "Tasks found c:" });
  }
  return res.status(404).json({ message: "Tasks not found :c" });
});

export default handler;
