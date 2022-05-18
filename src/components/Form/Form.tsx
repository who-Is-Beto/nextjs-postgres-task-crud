import React from "react";

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
            <label>{key}</label>
            <input
              type={value.type}
              onInput={(event) => props.handleChange(key as TInputs, event)}
              value={value.value}
            />
          </div>
        );
      })}
    </>
  );
};

export default Form;
