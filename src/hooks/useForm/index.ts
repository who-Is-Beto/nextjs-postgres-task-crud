import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition
} from "@reduxjs/toolkit/dist/query";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState, useEffect } from "react";
import validateValues from "who-fields-validator";

const useForm = (
  formInitialState: { [key: string]: any },
  validations: TFieldValidations[],
  mutation: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
      never,
      any,
      "services"
    >
  >
) => {
  const [formValues, setFormValues] = useState<{ [key: string]: any }>(formInitialState || {});
  const [formErrors, setFormErrors] = useState<{ [key: string]: any }>(formInitialState || {});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    console.log("handleChange");
    event.persist();
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
    setFormErrors({ ...formErrors, [event.target.name]: "" });
  };

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    event.persist();
    setFormErrors({ ...formErrors, ...validateValues(formValues, validations).errors });
    // Object.entries(validateValues(formValues, validations).errors).forEach(([key, value]) => {
    //   console.log(formErrors[key], key);
    //   setFormErrors({ ...formErrors, [key]: value });
    //   // setFormErrors({ ...formErrors, [key]: value });
    // });
    if (Object.keys(validateValues(formValues, validations).errors).length === 0) {
      setIsSubmit(true);
    }
  };

  useEffect((): void => {
    if (isSubmit) {
      mutation(formValues);
      setIsSubmit(false);
    }
  }, [isSubmit]);

  return {
    formValues,
    formErrors,
    handleChange,
    handleSubmit
  };
};

export default useForm;
