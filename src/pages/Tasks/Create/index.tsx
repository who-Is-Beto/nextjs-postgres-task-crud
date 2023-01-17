import { ShowToast } from "@/components/Toast";
import { useCreateTaskMutation } from "@/store/services/TasksService";
import TaskView from "@/views/TaskView";
import { userFromRequest } from "@/web/tokens";
import { User } from "@prisma/client";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const TaskCreate: NextPage<{ user: User }> = ({ user }): JSX.Element => {
  const router = useRouter();
  const [createTask, { isLoading, isSuccess, isError, error }] =
    useCreateTaskMutation();
  useEffect(() => {
    if (isSuccess) {
      ShowToast({ label: "Task Crated c:", type: "success" });
      setTimeout(() => {
        router.push(`/Tasks/${user.username}`);
      }, 1000);
      return;
    }
    if (isError) {
      ShowToast({ label: `${error} :c`, type: "error" });
    }
  }, [isSuccess]);
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

export default TaskCreate;
