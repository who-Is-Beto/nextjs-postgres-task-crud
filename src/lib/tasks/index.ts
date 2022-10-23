import { Task, User } from "@prisma/client";
import { prisma } from "@/config";
import { TDataToGetTasks } from "shimps";

export const getTasks = async (params: TDataToGetTasks): Promise<Task[] | null> => {
  const tasks: Task[] = await prisma.task.findMany({
    where: { owner: { id: params.userId } }
  });

  return tasks;
};

export const getAllTasks = async (): Promise<Task[] | null> => {
  const tasks: Task[] = await prisma.task.findMany();

  return tasks;
};

export const getTask = async (id: number): Promise<Task | null> => {
  const task: Task | null = await prisma.task.findUnique({
    where: { id }
  });

  return task;
};

export const createTask = async (data: Task, user: User): Promise<Task | null> => {
  const formattedData: Task = data.dateToComplete
    ? {
        ...data,
        userId: user.id,
        dateToComplete: new Date(data.dateToComplete)
      }
    : {
        ...data,
        userId: user.id,
        dateToComplete: null
      };
  const task: Task | null = await prisma.task.create({
    data: formattedData
  });

  return task;
};

export const updateTask = async (id: number, data: Task): Promise<Task | null> => {
  const task: Task | null = await prisma.task.update({
    where: { id },
    data
  });

  return task;
};
