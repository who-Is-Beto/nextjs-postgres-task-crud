import TasksService from "@/services/Tasks/TasksService";
import UsersService from "@/services/Users/UsersService";
import { NextPage } from "next";
import React from "react";
import { TUser } from "shimps";

export const getServerSideProps = async ({
  query
}: {
  query: { user: string };
}): Promise<{
  props: {
    user: unknown;
  };
}> => {
  const userService = new UsersService();
  const user = await userService.getUserByName(query.user.toString());

  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  };
};

const Tasks: NextPage<{ user: TUser }> = ({ user }): JSX.Element => {
  return <div>a</div>;
};

export default Tasks;
