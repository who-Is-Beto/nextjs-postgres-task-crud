import { TRoutes } from "shimps";

const routes: TRoutes = {
  "/": {
    protect: false,
    name: "Home",
    path: "/"
  },
  "/Login": {
    protect: false,
    name: "Login",
    path: "/login"
  },
  "/Signin": {
    protect: false,
    name: "Signin",
    path: "/signin"
  },
  "/Logout": {
    protect: false,
    name: "Logout",
    path: "/logout"
  },
  "/Tasks/[user]": {
    protect: true,
    name: "Tasks",
    path: "/tasks"
  }
};

export default routes;
