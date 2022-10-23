import React from "react";
import { FormField } from "shimps";
import Input from "../Input";
import FormStyles from "./form.module.css";

const Form: React.FC<{
  formData: { [key: string]: any };
  formFields: Array<FormField>;
  formErrors: {
    [key: string]: any;
  };
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}> = ({ formFields, formData, handleChange, formErrors }): JSX.Element => {
  return (
    <form className={FormStyles.form}>
      {formFields.map((field: FormField) => {
        return (
          <Input
            textArea={field.textArea as boolean}
            name={field.name}
            key={field.name}
            type={field.type}
            label={field.label}
            error={formErrors[field.name]}
            placeholder={field.placeholder}
            value={formData[field.name]}
            handleChange={handleChange}
          />
        );
      })}
    </form>
  );
};

export default Form;
