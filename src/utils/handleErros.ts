import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export type IResponseAction = (response: any) => PayloadAction<any>;

export const handleErrors = (
  errors: AxiosError,
  extraErrorsAction: IResponseAction | undefined,
  body: any,
  hideError: boolean,
  dispatch: any
) => {
  if (extraErrorsAction) {
    dispatch(extraErrorsAction(errors.response?.data));
  }
  if (hideError) {
    return null;
  }
};
