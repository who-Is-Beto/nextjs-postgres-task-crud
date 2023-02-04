import { axiosBaseQuery } from "@/utils/axiosCustom";
import { createApi } from "@reduxjs/toolkit/query/react";

export const rootServices = createApi({
  reducerPath: "rootServices",
  baseQuery: axiosBaseQuery({
    baseUrl: "/api/"
  }),
  endpoints: () => ({})
});
