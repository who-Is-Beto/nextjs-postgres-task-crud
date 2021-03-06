import { Interface } from "readline";

type IUserLoginData = {
  email: IUserLoginType;
  password: IUserLoginType;
};

type TUser = {
  id: number;
  username: string;
  password: string;
  email: string;
  created_at: string;
};

type TInputs =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "color"
  | "date"
  | "datetime-local"
  | "time"
  | "month"
  | "week";

type IUserLoginType = {
  type?: TInputs;
  value: string;
  placeholder?: string;
};

type TDataSendLogin = {
  email: string;
  password: string;
};

type TDataResponseLoginSuccess = {
  message: string;
  success: boolean;
  userName: string;
  jwt?: true;
};

type TDataResponseLoginError = {
  error: { data: TDataResponseLoginSuccess; status: number };
};

interface IStore {
  darkMode: boolean;
}

type TRouteNames = "/" | "/Login" | "/Signin" | "/Logout" | "/Tasks/[user]";

interface IRouteProperties {
  protect: boolean;
  name: string;
  path: TRouteNames;
  accessWithToken?: boolean;
}

type TRoutes = {
  [key: TRouteNames]: IRouteProperties;
};
