import { TDataResponseLoginSuccess, TDataSendLogin } from "shimps";
import { rootServices } from "../rootService";

const usersService = rootServices.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<TDataResponseLoginSuccess, TDataSendLogin>({
      query: ({ email, password }) => ({
        url: "/api/login",
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
    })
  })
});

export const { useLoginUserMutation } = usersService;
