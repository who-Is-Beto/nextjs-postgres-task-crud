import React from "react";
import { TInputs } from "shimps";
import InputStles from "./input.module.css";

const Input: React.FC<{
  label: string;
  value: any;
  handleChange: (key: TInputs, e: React.FormEvent<HTMLInputElement>) => void;
}> = ({
  label,
  value,
  handleChange
}: {
  label: string;
  value: any;
  handleChange: (key: TInputs, e: React.FormEvent<HTMLInputElement>) => void;
}): JSX.Element => {
  return (
    <label className={InputStles.label}>
      {label}
      <input
        className={InputStles.input}
        placeholder={value.placeholder}
        type={value.type}
        onInput={(event) => handleChange(label as TInputs, event)}
        value={value.value}
      />
    </label>
  );
};

export default Input;
