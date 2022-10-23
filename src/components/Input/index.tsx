import React from "react";
import { TInputs } from "shimps";
import InputStyles from "./input.module.css";

const Input: React.FC<{
  label: string;
  value: string;
  textArea: boolean;
  error: IStandardValidatorResponse;
  name: string;
  type: TInputs;
  placeholder?: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}> = ({ label, handleChange, value, textArea, type, placeholder, name, error }): JSX.Element => {
  return (
    <label className={InputStyles.label}>
      {label}
      {textArea && (
        <textarea
          className={`${InputStyles.input} ${InputStyles.input_textArea}`}
          placeholder={placeholder}
          name={name}
          onInput={handleChange as any}
          value={value}
        ></textarea>
      )}
      {!textArea && (
        <input
          className={InputStyles.input}
          placeholder={placeholder}
          type={type}
          name={name}
          onInput={handleChange as any}
          value={value}
        />
      )}
      {error && <p className={InputStyles.errorMessage}>{error.message}</p>}
    </label>
  );
};

export default Input;
