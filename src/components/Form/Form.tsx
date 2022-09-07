import React from "react";
import { IUserLoginType, TInputs } from "shimps";
import Input from "../Input";

type IFormProps = {
  [key: string]: IUserLoginType;
};

const Form: React.FC<{
  data: IFormProps;
  handleChange: (key: TInputs, e: React.FormEvent<HTMLInputElement>) => void;
}> = (props): JSX.Element => {
  return (
    <>
      {Object.entries(props.data).map(([key, value]) => {
        return (
          <div key={key}>
            <Input handleChange={props.handleChange} label={key} value={value} />
          </div>
        );
      })}
    </>
  );
};

export default Form;
