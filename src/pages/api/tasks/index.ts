import TasksService from "@/services/Tasks/TasksService";
import type { NextApiRequest, NextApiResponse } from "next";

export default function tasks(request: NextApiRequest, response: NextApiResponse) {
  const { method } = request;

  switch (method) {
    case "GET":
      const tasks = TasksService.getTasks();
      return response.status(200).json({ tasks });
    case "POST":
      const task = TasksService.createTask(request.body);
      return response.status(201).json({ task });
    default:
      return response.status(401).json({
        error: "Invalid method"
      });
  }
}
