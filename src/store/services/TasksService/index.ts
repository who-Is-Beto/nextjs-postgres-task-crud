import { Task } from "@prisma/client";
import { IResponse, TDataToGetTasks } from "shimps";
import { rootServices } from "../rootService";

const taskService = rootServices.injectEndpoints({
  endpoints: (builder) => ({
    deleteTask: builder.mutation<Task, number>({
      query: (id) => ({
        url: () => `tasks`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        data: { id }
      })
    }),
    createTask: builder.mutation<IResponse, Task>({
      query: (data) => ({
        url: () => "tasks",
        method: "POST",
        data,
        headers: {
          "Content-Type": "application/json"
        }
      })
    }),
    updateTask: builder.mutation<IResponse, Task>({
      query: (data) => ({
        url: () => `tasks/${data.id}`,
        method: "PUT",
        data
      })
    }),
    getTasksByUserId: builder.query<IResponse, TDataToGetTasks>({
      query: ({ userId }) => ({
        url: () => `tasks/${userId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: "admin123"
        }
      })
    })
  })
});

export const {
  useGetTasksByUserIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} = taskService;
