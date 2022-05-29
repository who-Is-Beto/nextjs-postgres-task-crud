import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootServices = createApi({
  reducerPath: "services",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/"
  }),
  endpoints: () => ({})
});
