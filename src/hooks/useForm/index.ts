import { BaseQueryArgs } from "@/utils/axiosCustom";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition
} from "@reduxjs/toolkit/dist/query";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState, useEffect } from "react";
import { DataResponseSuccess, IResponse } from "shimps";
import validateValues from "who-fields-validator";

const useForm = (
  formInitialState: { [key: string]: any },
  validations: TFieldValidations[],
  mutation: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<BaseQueryArgs, unknown, unknown, {}, {}>,
      never,
      DataResponseSuccess,
      "rootServices"
    >
  >
) => {
  const [formValues, setFormValues] = useState<{ [key: string]: any }>(
    formInitialState || {}
  );
  const [formErrors, setFormErrors] = useState<{ [key: string]: any }>(
    formInitialState || {}
  );
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    event.persist();
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
    setFormErrors({ ...formErrors, [event.target.name]: "" });
  };

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    event.persist();
    setFormErrors({
      ...formErrors,
      ...validateValues(formValues, validations).errors
    });
    if (
      Object.keys(validateValues(formValues, validations).errors).length === 0
    ) {
      setIsSubmit(true);
    }
  };

  useEffect((): void => {
    if (isSubmit) {
      mutation(formValues).then((res) => res);

      setIsSubmit(false);
    }
  }, [isSubmit, mutation, formValues]);

  return {
    formValues,
    formErrors,
    handleChange,
    handleSubmit
  };
};

export default useForm;
