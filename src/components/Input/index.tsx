import React from "react";
import { TInputs } from "shimps";
import InputStyles from "./input.module.css";

const Input: React.FC<{
  label: string;
  value: string;
  errorMessage: string;
  name: string;
  type: TInputs;
  placeholder?: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}> = ({ label, handleChange, value, type, placeholder, name, errorMessage }): JSX.Element => {
  return (
    <label className={InputStyles.label}>
      {label}
      <input
        className={InputStyles.input}
        placeholder={placeholder}
        type={type}
        name={name}
        onInput={handleChange as any}
        value={value}
      />
      <small className={InputStyles.errorMessage}>{errorMessage}</small>
    </label>
  );
};

export default Input;
