import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import useForm from "@/hooks/useForm";
import { useCreateTaskMutation } from "@/store/services/TasksService";
import taskFields from "@/utils/taskFields";
import taskFieldValidations from "@/utils/taskFieldsValidations";
import { userFromRequest } from "@/web/tokens";
import { User } from "@prisma/client";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import createStyles from "./create.module.css";

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
    <div>
      <h1 className={createStyles.create__title}>
        Create a new <span className="green"> task!</span>
      </h1>
      {isError && <p>There was an error creating your task, please try again later.</p>}
      {isLoading && <p className={createStyles.create__loading}>Loading...</p>}
      {isSuccess && <p className={createStyles.create__success}>Task created!</p>}
      {!isLoading && !isSuccess && (
        <>
          <Form
            formFields={taskFields}
            formErrors={formErrors}
            formData={formValues}
            handleChange={handleChange}
          />
          <Button onClIick={handleSubmit} type="primary">
            Create task
          </Button>
        </>
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

export default TaskCreate;
