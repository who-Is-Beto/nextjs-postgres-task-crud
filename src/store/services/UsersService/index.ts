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
        url: () => "/sessions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: "admin123"
        },
        data: {
          email,
          password
        }
      })
    }),
    updateUser: builder.mutation<DataResponseSuccess, TDataSendRegister>({
      query: ({ email, password, username }) => ({
        url: (): string => "/users",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          apikey: "admin123"
        },
        data: {
          email,
          password,
          username
        }
      })
    }),
    createUser: builder.mutation<DataResponseSuccess, TDataSendRegister>({
      query: ({ email, password, username }) => ({
        url: (): string => "/users",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: "admin123"
        },
        data: {
          email,
          password,
          username
        }
      })
    }),
    logoutUser: builder.mutation<DataResponseMessage, void>({
      query: () => ({
        url: (): string => "/sessions",
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
