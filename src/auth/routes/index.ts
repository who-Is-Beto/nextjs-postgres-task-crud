import { TRoutes } from "shimps";

export const UnAuthRoutes: TRoutes[] = ["/Login", "/Signin"];
export const AuthRoutes: TRoutes[] = ["/Logout", "/Tasks/[user]", "/Settings"];

const routes: TRoutes = {
  "/": {
    protect: false,
    name: "Home",
    path: "/",
    accessWithToken: false
  },
  "/Login": {
    protect: false,
    name: "Login",
    path: "/login",
    accessWithToken: false
  },
  "/Signin": {
    protect: false,
    name: "Signin",
    path: "/signin",
    accessWithToken: false
  },
  "/Logout": {
    protect: true,
    name: "Logout",
    path: "/logout",
    accessWithToken: true
  },
  "/Settings": {
    protect: true,
    name: "Settings",
    path: "/Settings",
    accessWithToken: true
  },
  "/Tasks/[user]": {
    protect: true,
    name: "Tasks",
    path: "/tasks",
    accessWithToken: true
  }
};

export default routes;
