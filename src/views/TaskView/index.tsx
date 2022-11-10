import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import useForm from "@/hooks/useForm";
import taskFields from "@/utils/taskFields";
import taskFieldValidations from "@/utils/taskFieldsValidations";
import { Task } from "@prisma/client";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition
} from "@reduxjs/toolkit/dist/query";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useRouter } from "next/router";
import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { IResponse } from "shimps";
import createStyles from "./create.module.css";

const TaskView: React.FC<{
  isError: boolean;
  mutation: MutationTrigger<
    MutationDefinition<
      { [key: string]: any },
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
      never,
      IResponse,
      "services"
    >
  >;
  isLoading: boolean;
  isSuccess: boolean;
  title: string;
  buttonLabel: string;
  greenText?: string;
  task?: Task;
}> = ({ isError, isLoading, isSuccess, mutation, buttonLabel, title, task, greenText }): JSX.Element => {
  const router = useRouter();
  const { formErrors, formValues, handleChange, handleSubmit } = useForm(
    {
      title: task?.title ? task.title : "",
      description: task?.description ? task.description : "",
      dateToComplete: task?.dateToComplete ? task.dateToComplete : "",
    },
    taskFieldValidations,
    mutation
  );

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <div className={createStyles.back}>
        <Button onClIick={handleGoBack} type="primary">
          <IoArrowBackSharp />
          back
        </Button>
      </div>
      <h1 className={createStyles.create__title}>
        {title} <span className="green">{greenText}</span>
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
            {buttonLabel}
          </Button>
        </>
      )}
    </div>
  );
};

export default TaskView;
