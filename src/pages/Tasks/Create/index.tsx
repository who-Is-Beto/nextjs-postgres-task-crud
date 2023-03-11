import { ShowToast } from "@/components/Toast";
import { useCreateTaskMutation } from "@/store/services/TasksService";
import TaskView from "@/views/TaskView";
import {  NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const TaskCreate: NextPage = (): JSX.Element => {
  const router = useRouter();
  const [createTask, { isLoading, isSuccess, isError, error }] =
    useCreateTaskMutation();
  useEffect(() => {
    if (isSuccess) {
      ShowToast({ label: "Task Crated c:", type: "success" });
      setTimeout(() => {
        router.push(`/Tasks`);
      }, 1000);
      return;
    }
    if (isError) {
      ShowToast({ label: `${error} :c`, type: "error" });
    }
  }, [isSuccess, isError]);
  return (
    <TaskView
      buttonLabel="Create task"
      title="Create a new"
      greenText="Task!"
      isError={isError}
      isLoading={isLoading}
      mutation={createTask}
      isSuccess={isSuccess}
    />
  );
};

export default TaskCreate;
