import { TTask } from "shimps";
import { prisma } from "../../config";

class TasksService {
  public createTask(task: TTask) {
    return prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        userId: task.userId
      },
      select: {
        owner: true
      }
    });
  }

  public async getTasks() {
    return await prisma.task.findMany({
      select: {
        owner: true,
        id: true,
        title: true,
        description: true,
        completed: true,
        created_at: true,
        updated_at: true
      }
    });
  }
}

export default new TasksService();
