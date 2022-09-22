import Button from "@/components/Button/Button";
import TaskCard from "@/components/TaskCrard";
import { useGetTasksByUserIdQuery } from "@/store/services/TasksService";
import { userFromRequest } from "@/web/tokens";
import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { TUser } from "shimps";
import taskStyles from "./tasks.module.css";
import { BsPlusCircleFill } from "react-icons/bs";

const Tasks: NextPage<{ user: TUser }> = ({ user }): JSX.Element => {
  const { data, error } = useGetTasksByUserIdQuery({ userId: user.id });
  return (
    <div className={taskStyles.taskPage}>
      <h1 className={taskStyles.userGreeting}>
        Hello <span className={taskStyles.userGreeting__name}>{user.username}</span>!
      </h1>
      <div className={taskStyles.tasks}>
        {data?.tasks?.map((task) => (
          <TaskCard key={task.id} username={user.username} task={task} />
        ))}
      </div>
      <div className={taskStyles.taskAdd}>
        <Button type="warning">
          <strong className={taskStyles.taskAdd__icon}>+</strong>
        </Button>
      </div>
    </div>
  );
};

export async function getServerSideProps(constext: GetServerSidePropsContext) {
  const user = await userFromRequest(constext.req);
  if (user) {
    return {
      props: {
        user: JSON.parse(JSON.stringify(user))
      }
    };
  }

  return {
    props: {}
  };
}

export default Tasks;
