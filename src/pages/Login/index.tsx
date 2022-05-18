import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import React, { useState } from "react";

const Login: React.FC = (): JSX.Element => {
  const [userData, setUserData] = useState<IUserLoginData>({
    email: {
      value: "",
      type: "text"
    },
    password: {
      value: "",
      type: "password"
    }
  });

  const handleChange = (key: TInputs, e: React.FormEvent<HTMLInputElement>): void => {
    setUserData({
      ...userData,
      [key]: {
        ...userData[key],
        value: e.currentTarget.value
      }
    });
  };

  const handleSubmit = (): void => {
    console.log(userData);
  };

  return (
    <>
      <Form data={userData} handleChange={handleChange} />
      <Button onClIick={handleSubmit} label="Login" />
    </>
  );
};

export default Login;
