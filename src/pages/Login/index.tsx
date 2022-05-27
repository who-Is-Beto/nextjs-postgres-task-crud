import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Styles from "./login.module.css";
import fetch from "isomorphic-unfetch";

const Login: React.FC = (): JSX.Element => {
  const [userData, setUserData] = useState<IUserLoginData>({
    email: {
      value: "",
      type: "text",
      placeholder: "whoyouare@gmail.com"
    },
    password: {
      value: "",
      type: "password",
      placeholder: "password"
    }
  });

  const router = useRouter();

  const handleChange = (key: TInputs, e: React.FormEvent<HTMLInputElement>): void => {
    setUserData({
      ...userData,
      [key]: {
        ...(userData as any)[key],
        value: e.currentTarget.value
      }
    });
  };

  const handleSubmit = (): void => {
    Object.values(userData).forEach((value) => {
      delete value.type;
      delete value.placeholder;
    });
  };

  return (
    <div className={Styles.login}>
      <Form data={userData} handleChange={handleChange} />
      <small>
        Don't you have account? <Link href={"/Signin"}>Sign in</Link>
      </small>
      <Button onClIick={handleSubmit} label="Login" />
    </div>
  );
};

export default Login;
