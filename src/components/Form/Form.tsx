import React from "react";
import { IUserLoginType } from "shimps";
import Input from "../Input";

const Form: React.FC<{
  userData: { [key: string]: any };
  formFields: Array<IUserLoginType>;
  formErrors: {
    [key: string]: any;
  };
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}> = ({ formFields, userData, handleChange, formErrors }): JSX.Element => {
  return (
    <>
      {formFields.map((field: IUserLoginType) => {
        return (
          <Input
            name={field.name}
            key={field.name}
            type={field.type}
            label={field.label}
            error={formErrors[field.name]}
            placeholder={field.placeholder}
            value={userData[field.name]}
            handleChange={handleChange}
          />
        );
      })}
    </>
  );
};

export default Form;
