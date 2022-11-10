import Button from "@/components/Button/Button";
import TaskCard from "@/components/TaskCrard";
import { useGetTasksByUserIdQuery } from "@/store/services/TasksService";
import { userFromRequest } from "@/web/tokens";
import { User } from "@prisma/client";
import { GetServerSidePropsContext, NextPage } from "next";
import React, { useState } from "react";
import taskStyles from "./tasks.module.css";

const Tasks: NextPage<{ user: User }> = ({ user }): JSX.Element => {
  const { data, isLoading } = useGetTasksByUserIdQuery({ userId: user.id });
  const [scrolling, setScrolling] = useState(false);
  const HEIGTH_TO_SHOW_SCROLL = 85;

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (event.currentTarget.scrollTop > HEIGTH_TO_SHOW_SCROLL) {
      setScrolling(true);
      return;
    }
    setScrolling(false);
  };

  return (
    <div className={taskStyles.taskPage}>
      <h1 className={taskStyles.userGreeting}>
        Hello <span className={taskStyles.userGreeting__name}>{user.username}</span>!
      </h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && data && <div className={taskStyles.tasks} onScroll={handleScroll}>
        {data.tasks?.map((task) => (
          <TaskCard key={task.id} username={user.username} task={task} />
        ))}
      </div>}
      {!scrolling && (
        <div className={taskStyles.taskAdd}>
          <Button href={`/Tasks/Create`} type="warning">
            <strong className={taskStyles.taskAdd__icon}>+</strong>
          </Button>
        </div>
      )}
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
