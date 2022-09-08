import { User } from "@prisma/client";
import { prisma } from "@/config";
import verifyPassword from "@/auth/pass-verify";
import { TDataSendLogin } from "shimps";

export const login = async (params: TDataSendLogin): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { email: params.email } });
  if (!user) return null;
  if (await verifyPassword(params.password, user.password)) {
    user.password = "";

    return user;
  }
  return null;
};
