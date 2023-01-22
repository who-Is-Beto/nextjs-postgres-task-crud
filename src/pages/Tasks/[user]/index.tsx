import Board from "@/components/Board";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader";
import { Modal } from "@/components/Modal";
import DeleteTask from "@/components/Modal/DeleteTask";
import TaskCard from "@/components/TaskCrard";
import { useGetTasksByUserIdQuery } from "@/store/services/TasksService";
import ErrorView from "@/views/ErrorView";
import { userFromRequest } from "@/web/tokens";
import { Task, User } from "@prisma/client";
import { GetServerSidePropsContext, NextPage } from "next";
import React, { useEffect, useState } from "react";
import taskStyles from "./tasks.module.css";

const Tasks: NextPage<{ user: User }> = ({ user }): JSX.Element => {
  const { data, isLoading } = useGetTasksByUserIdQuery({ userId: user.id });
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const HEIGTH_TO_SHOW_SCROLL = 85;

  const handleModal = (newIsOpen: boolean, task?: Task): void => {
    setModal(newIsOpen);
    if (task) {
      setTaskToDelete(task);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (event.currentTarget.scrollTop > HEIGTH_TO_SHOW_SCROLL) {
      setScrolling(true);
      return;
    }
    setScrolling(false);
  };

  useEffect(() => {
    if (!modal) {
      setTaskToDelete(null);
    }
  }, [modal]);

  return (
    <div className={taskStyles.taskPage}>
      <h1 className={taskStyles.userGreeting}>
        Hello{" "}
        <span className={taskStyles.userGreeting__name}>{user.username}</span>!
      </h1>
      {isLoading && <Loader type="bars" />}
      {!isLoading && !data?.tasks?.length && (
        <ErrorView message="You dont have any task yet :c" />
      )}
      {!isLoading && data?.tasks && (
        <div className={taskStyles.tasks} onScroll={handleScroll}>
          {/* {data?.tasks.map((task) => (
            <TaskCard
              handleModal={handleModal}
              key={task.id}
              username={user.username}
              task={task}
            />
          ))} */}
          <Board tasks={data.tasks} />
        </div>
      )}
      {!scrolling && (
        <div className={taskStyles.taskAdd}>
          <Button href={`/Tasks/Create`} type="warning">
            <strong className={taskStyles.taskAdd__icon}>+</strong>
          </Button>
        </div>
      )}
      <Modal isOpen={modal} openHandler={handleModal}>
        <>
          <DeleteTask openHandler={handleModal} task={taskToDelete as Task} />
        </>
      </Modal>
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
