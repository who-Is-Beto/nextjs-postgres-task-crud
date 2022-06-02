import { TRoutes } from "shimps";

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
    path: "/logout"
  },
  "/Tasks/[user]": {
    protect: true,
    name: "Tasks",
    path: "/tasks",
    accessWithToken: true
  }
};

export default routes;
