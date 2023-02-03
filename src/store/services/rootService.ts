import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootServices = createApi({
  reducerPath: "services",
  baseQuery: fetchBaseQuery({
    baseUrl: document.URL || "https://nextjs-postgres-task-crud.vercel.app/"
  }),
  endpoints: () => ({})
});
