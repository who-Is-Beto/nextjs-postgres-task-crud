import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import Loader from "@/components/Loader";
import useForm from "@/hooks/useForm";
import taskFields from "@/utils/taskFields";
import taskFieldValidations from "@/utils/taskFieldsValidations";
import { Task } from "@prisma/client";
import { BaseQueryFn, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useRouter } from "next/router";
import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { IResponse } from "shimps";
import createStyles from "./create.module.css";
import TaskCard from "@/components/TaskCrard";
import { BaseQueryArgs } from "@/utils/axiosCustom";

const TaskView: React.FC<{
  isError: boolean;
  mutation: MutationTrigger<
    MutationDefinition<
      Task,
      BaseQueryFn<BaseQueryArgs, unknown, unknown, {}, {}>,
      never,
      IResponse,
      "rootServices"
    >
  >;
  isLoading: boolean;
  isSuccess: boolean;
  title: string;
  buttonLabel: string;
  greenText?: string;
  task?: Task;
}> = ({
  isLoading,
  mutation,
  buttonLabel,
  title,
  task,
  greenText
}): JSX.Element => {
  const router = useRouter();
  const { formErrors, formValues, handleChange, handleSubmit } = useForm(
    {
      title: task?.title ? task.title : "",
      description: task?.description ? task.description : "",
      dateToComplete: task?.dateToComplete ? task.dateToComplete : ""
    },
    taskFieldValidations,
    mutation
  );

  const handleGoBack = (): void => {
    router.push("/Tasks");
  };

  return (
    <>
      <div className={createStyles.back}>
        <Button refresh={true} onClIick={handleGoBack} type="primary">
          <IoArrowBackSharp />
          back
        </Button>
      </div>
      <h1 className={createStyles.create__title}>
        {title} <span className="green">{greenText}</span>
      </h1>
      <div className={createStyles.container}>
        {isLoading && <Loader type="bars" />}
        {!isLoading && (
          <div>
            <Form
              formFields={taskFields}
              formErrors={formErrors}
              formData={formValues}
              handleChange={handleChange}
            />
            <Button onClIick={handleSubmit} type="primary">
              {buttonLabel}
            </Button>
          </div>
        )}
        <TaskCard task={{ ...formValues, status: "pending" } as Task} />
      </div>
    </>
  );
};

export default TaskView;
