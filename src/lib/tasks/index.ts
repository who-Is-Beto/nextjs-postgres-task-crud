import { Task } from "@prisma/client";
import { prisma } from "@/config";
import { TDataToGetTasks } from "shimps";

export const getTasks = async (params: TDataToGetTasks): Promise<Task[] | null> => {
  const tasks: Task[] = await prisma.task.findMany({
    where: { owner: { id: params.userId } }
  });

  return tasks;
};
