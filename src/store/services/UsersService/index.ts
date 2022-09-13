import {
  DataResponseMessage,
  DataResponseSuccess,
  TDataSendLogin,
  TDataSendRegister
} from "shimps";
import { rootServices } from "../rootService";

const usersService = rootServices.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<DataResponseSuccess, TDataSendLogin>({
      query: ({ email, password }) => ({
        url: "/api/sessions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: "admin123"
        },
        body: {
          email,
          password
        }
      })
    }),
    updateUser: builder.mutation<DataResponseSuccess, TDataSendRegister>({
      query: ({ email, password, username }) => ({
        url: "/api/users",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          apikey: "admin123"
        },
        body: {
          email,
          password,
          username
        }
      })
    }),
    createUser: builder.mutation<DataResponseSuccess, TDataSendRegister>({
      query: ({ email, password, username }) => ({
        url: "/api/users",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: "admin123"
        },
        body: {
          email,
          password,
          username
        }
      })
    }),
    logoutUser: builder.mutation<DataResponseMessage, void>({
      query: () => ({
        url: "/api/sessions",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          apikey: "admin123"
        }
      })
    })
  })
});

export const {
  useUpdateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useCreateUserMutation
} = usersService;
