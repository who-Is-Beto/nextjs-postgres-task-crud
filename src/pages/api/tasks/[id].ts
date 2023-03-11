import { getTask, getTasks, updateTask } from "@/lib/tasks";
import defaultHandler from "@/pages/_defaultHandler";
import { Task } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = defaultHandler<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {

    const tasks = await getTasks({ userId: Number(req.query.id) });
    if (tasks) {
      return res.status(200).json({ tasks, message: "Tasks found c:" });
    }
    return res.status(404).json({ message: "Tasks not found :c" });
  })
  .put(async (req, res) => {
    const prevTask = await getTask(Number(req.query.id));
    const task = await updateTask(Number(req.query.id), {...prevTask, ...req.body, dateToComplete: new Date(req.body.dateToComplete)} as Task);
    if (task) {
      return res.status(200).json({ task, message: "Task updated c:" });
    }
    return res.status(404).json({ message: "Task not found :c" });
  });

export default handler;
