import { createTask, deleteTask } from "@/lib/tasks";
import defaultHandler from "@/pages/_defaultHandler";
import { userFromRequest } from "@/web/tokens";
import { Task, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = defaultHandler<NextApiRequest, NextApiResponse>()
  .post(async (req, res) => {
    const user = await userFromRequest(req);
    const task = await createTask(req.body as Task, user as User);
    if (task) {
      return res.status(201).json({ task, message: "Task created c:" });
    }
    return res.status(400).json({ message: "Task not created, try it later :c" });
  })
  .delete(async (req, res) => {
    const user = await userFromRequest(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    const task = await deleteTask(Number(req.body.id));
    if (task) {
      return res.status(201).json({ task, message: "Task deleted c:" });
    }
    return res.status(406).json({ message: "Task not deleted, try it later :c" });
  });

export default handler;
