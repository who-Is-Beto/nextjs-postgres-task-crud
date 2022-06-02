import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Styles from "./login.module.css";
import { useLoginUserMutation } from "@/store/services/UsersService";
import { IUserLoginData, TInputs } from "shimps";

const Login: React.FC = (): JSX.Element => {
  const [loginUser, { error, data }] = useLoginUserMutation();
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

  const handleSubmit = async (): Promise<void> => {
    await loginUser({
      email: userData.email.value,
      password: userData.password.value
    });
  };

  useEffect((): void => {
    if (data?.jwt) {
      router.push(`/Tasks/${data.userName}`);
    }
  }, [error, data]);

  return (
    <div className={Styles.login}>
      {error && <h1>ERRORR</h1>}
      <Form data={userData} handleChange={handleChange} />
      <small>
        Don't you have account? <Link href={"/Signin"}>Sign in</Link>
      </small>
      <Button onClIick={handleSubmit} label="Login" />
    </div>
  );
};

export default Login;
