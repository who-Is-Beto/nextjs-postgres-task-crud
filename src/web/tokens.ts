import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextApiResponse } from "next";
import { prisma } from "@/config";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { IncomingMessage } from "http";
import ENVS from "@/constants/envs";

const cookieOptions = {
  httpOnly: true,
  maxAge: 2592000,
  path: "/",
  sameSite: "Strict",
  secure: ENVS.env
};

function setCookie(
  res: any,
  name: string,
  value: string,
  options: Record<string, unknown> = {}
): void {
  const stringValue =
    typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
}

export function authenticatedUser(res: NextApiResponse, user: User): void {
  if (!user) return;
  const token = jwt.sign({ email: user.email }, ENVS.tokenKey, {
    expiresIn: "7d"
  });

  setCookie(res, ENVS.tokenKey, token, cookieOptions);
}

export function logoutUser(res: NextApiResponse) {
  setCookie(res, "OutsideJWT", "0", {
    ...cookieOptions,
    path: "/",
    maxAge: 1
  });
}

export async function userFromRequest(
  req: IncomingMessage & { cookies: NextApiRequestCookies }
): Promise<User | undefined> {
  if (!req.cookies.OutsideJWT) {
    return undefined;
  }

  try {
    const data = await jwt.verify(req.cookies.OutsideJWT, ENVS.tokenKey);

    if (!data) return undefined;

    const user = await prisma.user.findUnique({
      where: { email: (data as any).email }
    });

    if (user) user.password = "";

    return user as User;
  } catch (error) {
    return undefined;
  }
}
