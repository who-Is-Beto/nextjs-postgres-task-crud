import { Task } from "@prisma/client";
import { DataResponseSuccess, IResponse, TDataToGetTasks } from "shimps";
import { rootServices } from "../rootService";

const taskService = rootServices.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<IResponse, Task>({
      query: (data) => ({
        url: "/api/tasks",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      })
    }),
    updateTask: builder.mutation<IResponse, Task>({
      query: (data) => ({
        url: `/api/tasks/${data.id}`,
        method: "PUT",
        body: data
      })
    }),
    getTasksByUserId: builder.query<IResponse, TDataToGetTasks>({
      query: ({ userId }) => ({
        url: `/api/tasks/${userId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: "admin123"
        }
      })
    })
  })
});

export const { useGetTasksByUserIdQuery, useCreateTaskMutation, useUpdateTaskMutation } =
  taskService;
