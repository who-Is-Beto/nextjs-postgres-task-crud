import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { getTask } from "@/lib/tasks";
import { Task } from "@prisma/client";
import Button from "@/components/Button/Button";
import Select from "@/components/Select";
import Option from "@/components/Select/Option";
import { IoArrowBackSharp } from "react-icons/io5";
import SingleTaskStyles from "./singleTask.module.css";
import { taskStates } from "@/constants";
import { TaskTates } from "shimps";
import { useUpdateTaskMutation } from "@/store/services/TasksService";
import { GrEdit } from "react-icons/gr";

const Task: NextPage<{ task: Task }> = ({ task }): JSX.Element => {
  const router = useRouter();
  const [updateTask] = useUpdateTaskMutation();
  const [taskStatus, setTaskStatus] = useState<TaskTates>(task.status as TaskTates);
  const { user } = router.query;
  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    updateTask({ ...task, status: taskStatus });
  }, [taskStatus, task, updateTask]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={SingleTaskStyles.task}>
      <div className={SingleTaskStyles.task__back}>
        <Button onClIick={handleGoBack} type="primary">
          <IoArrowBackSharp />
          back
        </Button>
      </div>
      <div className={SingleTaskStyles.task__header}>
        <h1 className={SingleTaskStyles.task__title}>{task.title}</h1>
        <Select selectHandler={setTaskStatus} placeholder={task.status}>
          {taskStates.map((state) => (
            <Option key={state} value={state}>
              {state}
            </Option>
          ))}
        </Select>
      </div>
      <div className={SingleTaskStyles.task__body}>
        <div>
          <strong> Created at:</strong>{" "}
          <span>
            {new Date(task.created_at as Date).toLocaleString("us", {
              dateStyle: "long",
              timeStyle: "medium"
            })}
          </span>
        </div>
        <p className={SingleTaskStyles.task__description}>{task.description}</p>
        <div className={SingleTaskStyles.task__edit}>
          <Button href={`/Tasks/${user}/edit/${task.id}`} type="info">
            <GrEdit />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const task = await getTask(Number(params?.id));
    return {
      props: {
        task: JSON.parse(JSON.stringify(task))
      },
      revalidate: 5
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true
  };
};

export default Task;
