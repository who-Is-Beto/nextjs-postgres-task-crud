import { Task, User } from "@prisma/client";
import { Interface } from "readline";

type IUserLoginData = {
  email: IUserLoginType;
  password: IUserLoginType;
};

type TUser = {
  id: number;
  username: string;
  password: string;
  tasks: ITask[];
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
  type: TInputs;
  name: string;
  placeholder: string;
  label: string;
};

interface TDataSendLogin {
  email: string;
  password: string;
}

interface TDataToGetTasks {
  userId: number;
}

interface TDataSendRegister extends TDataSendLogin {
  username: string;
}

interface DataResponseMessage {
  message: string;
}

interface DataResponseSuccess extends DataResponseMessage {
  user?: User;
  tasks?: Task[];
}

type TDataResponseLoginError = {
  error: { data: TDataResponseLoginSuccess; status: number };
};

type TLenguages = "spanish" | "english";

interface IAuth {
  token: boolean;
}

interface IUserConfig {
  lenguage: TLenguages;
  darkMode: boolean;
}

interface IStore {
  config: IUserConfig;
  auth: IAuth;
}

interface IAviableLenguages {
  [key: string]: boolean;
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

type TTask = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
  updated_at: string;
  created_at: string;
  owner: TUser;
};

type TButtons =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";
