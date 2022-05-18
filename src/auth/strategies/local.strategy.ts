import UsersService from "@/services/Users/UsersService";
import { Strategy } from "passport-local";

export const localStrategy = new Strategy(async (username: string, password: string, done) => {
  const usersService = new UsersService();
  const user = await usersService.getUserByName(username);
  if (!user) {
    return done(null, false, { message: "Incorrect username" });
  }
});
