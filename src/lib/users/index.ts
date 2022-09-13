import { User } from "@prisma/client";
import { prisma } from "@/config";
import { encryptPassword } from "../auth/passwordUtils";
import { TDataSendRegister } from "shimps";

export const createUser = async (params: TDataSendRegister): Promise<User | null> => {
  const password = await encryptPassword(params.password);

  const user = await prisma.user.create({
    data: { ...params, password }
  });

  user.password = "";
  return user;
};

export const updateUser = async (params: TDataSendRegister): Promise<User | null> => {
  const password = await encryptPassword(params.password);

  const user = await prisma.user.update({
    where: { email: params.email },
    data: { ...params, password }
  });

  user.password = "";
  return user;
};
