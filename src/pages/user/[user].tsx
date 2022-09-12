import { userFromRequest } from "@/web/tokens";
import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { TUser } from "shimps";

const User: NextPage<{ user: TUser }> = ({ user }): JSX.Element => {
  return <div>a</div>;
};

export default User;
