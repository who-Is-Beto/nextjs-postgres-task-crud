import Board from "@/components/Board";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader";
import { useGetTasksByUserIdQuery } from "@/store/services/TasksService";
import ErrorView from "@/views/ErrorView";
import { userFromRequest } from "@/web/tokens";
import { Task, User } from "@prisma/client";
import { GetServerSidePropsContext, NextPage } from "next";
import React, { useEffect, useState } from "react";
import taskStyles from "./tasks.module.css";
import { useRouter } from "next/router";

const Tasks: NextPage<{ user: User }> = ({ user }): JSX.Element => {
  const { data, isLoading, refetch } = useGetTasksByUserIdQuery({
    userId: user.id
  });
  const [scrolling, setScrolling] = useState<boolean>(false);
  const router = useRouter();
  const HEIGTH_TO_SHOW_SCROLL = 85;

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (event.currentTarget.scrollTop > HEIGTH_TO_SHOW_SCROLL) {
      setScrolling(true);
      return;
    }
    setScrolling(false);
  };

  useEffect(() => {
    refetch();
  }, [router.pathname]);

  return (
    <div className={taskStyles.taskPage}>
      <h1 className={taskStyles.userGreeting}>
        Hello{" "}
        <span className={taskStyles.userGreeting__name}>{user.username}</span>!
      </h1>
      {isLoading && <Loader type="bars" />}
      {!isLoading && data!.tasks!.length === 0 && (
        <ErrorView message="You dont have any task yet :c" />
      )}
      {!isLoading && data!.tasks!.length > 0 && (
        <div className={taskStyles.tasks} onScroll={handleScroll}>
          <Board user={user} tasks={data!.tasks as Task[]} />
        </div>
      )}
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
