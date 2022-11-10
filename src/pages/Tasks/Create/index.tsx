import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import useForm from "@/hooks/useForm";
import { useCreateTaskMutation } from "@/store/services/TasksService";
import taskFields from "@/utils/taskFields";
import taskFieldValidations from "@/utils/taskFieldsValidations";
import TaskView from "@/views/TaskView";
import { userFromRequest } from "@/web/tokens";
import { User } from "@prisma/client";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const TaskCreate: NextPage<{ user: User }> = ({ user }): JSX.Element => {
  const router = useRouter();
  const [createTask, { isLoading, isSuccess, isError }] = useCreateTaskMutation();
  const { formErrors, formValues, handleChange, handleSubmit } = useForm(
    {
      title: "",
      description: "",
      dateToComplete: ""
    },
    taskFieldValidations,
    createTask
  );

  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        router.push(`/Tasks/${user.username}`);
      }
    }, 1000);
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
