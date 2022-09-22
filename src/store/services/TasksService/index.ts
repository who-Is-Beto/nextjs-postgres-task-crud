import { DataResponseSuccess, TDataToGetTasks } from "shimps";
import { rootServices } from "../rootService";

const taskService = rootServices.injectEndpoints({
  endpoints: (builder) => ({
    getTasksByUserId: builder.query<DataResponseSuccess, TDataToGetTasks>({
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

export const { useGetTasksByUserIdQuery } = taskService;
