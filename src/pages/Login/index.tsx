import React, { useState } from "react";
import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import Link from "next/link";
import Styles from "./login.module.css";
import { useLoginUserMutation } from "@/store/services/UsersService";
import { IUserLoginData, TInputs } from "shimps";
import { RiLoginBoxFill } from "react-icons/ri";
import { GetServerSidePropsContext } from "next";
import { userFromRequest } from "@/web/tokens";

const Login: React.FC = (): JSX.Element => {
  const [loginUser, { error, data }] = useLoginUserMutation();
  const [userData, setUserData] = useState<IUserLoginData>({
    email: {
      value: "",
      type: "email",
      placeholder: "whoyouare@gmail.com"
    },
    password: {
      value: "",
      type: "password",
      placeholder: "password"
    }
  });

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

  return (
    <div className={Styles.login}>
      {error && <h1>ERRORR</h1>}
      <Form data={userData} handleChange={handleChange} />
      <small>
        Don{"&apos"}t you have account?{" "}
        <Link href={"/Signin"}>
          <a className={Styles.signinLink}>Sign in</a>
        </Link>
        !
      </small>
      <Button type="primary" onClIick={handleSubmit}>
        Login <RiLoginBoxFill />
      </Button>
    </div>
  );
};

export async function getServerSideProps(constext: GetServerSidePropsContext) {
  const user = await userFromRequest(constext.req);
  if (user) {
    return {
      redirect: {
        destination: `/Tasks/${user.username}`,
        permanent: false
      }
    };
  }
  return {
    props: {}
  };
}

export default Login;
