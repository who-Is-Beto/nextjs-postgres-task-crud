import axios, { AxiosRequestConfig } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { IRootState } from "../store/index";
import { handleErrors, IResponseAction } from "./handleErros";

export interface BaseQueryArgs {
  url: (state: IRootState) => string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  extraErrorAction?: IResponseAction;
  hideError?: boolean;
  referenceErrorsKeys?: { [name: string]: string };
  hideLoader?: boolean;
  extraSuccessActions?: IResponseAction[];
  extraHeaders?: { [name: string]: string | number };
}

export const axiosBaseQuery =
  ({
    baseUrl
  }: {
    baseUrl?: string;
    ignoreToken?: boolean;
    ignoreApiKey?: boolean;
  }): BaseQueryFn<BaseQueryArgs, unknown, unknown> =>
  async (
    {
      url,
      method,
      data,
      extraErrorAction,
      hideError,
      extraSuccessActions,
      extraHeaders
    },
    api
  ) => {
    const state: IRootState = api.getState() as any;
    const urlPath = url(state);
    let headers = {
      "Content-Type": "application/json"
    };
    if (extraHeaders) {
      headers = { ...headers, ...extraHeaders };
    }
    try {
      const result = await axios({
        url: `${baseUrl}/${urlPath}`,
        method,
        data,
        headers
      });

      if (extraSuccessActions) {
        extraSuccessActions.map((action): void => {
          api.dispatch(action(result.data));
        });
      }

      return { data: result.data };
    } catch (axiosError) {
      const err: any = axiosError;
      handleErrors(err, extraErrorAction, data, !!hideError, api.dispatch);
      return {
        error: { status: err.response?.status, data: err.response?.data }
      };
    }
  };
