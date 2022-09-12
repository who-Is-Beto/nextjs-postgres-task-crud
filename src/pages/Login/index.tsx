import React, { useEffect } from "react";
import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import Link from "next/link";
import Styles from "./login.module.css";
import { useLoginUserMutation } from "@/store/services/UsersService";
import { RiLoginBoxFill } from "react-icons/ri";
import { GetServerSidePropsContext, NextPage } from "next";
import { userFromRequest } from "@/web/tokens";
import useForm from "../../hooks/useForm";
import loginValidations from "./validations";
import formFields from "./formFields";
import { useServerRefresher } from "@/hooks/useServerRefresher";
import { User } from "@prisma/client";
// import LoginImage from "../../assets/images/login.svg";

const Login: NextPage = (): JSX.Element => {
  const [loginUser, { error, data }] = useLoginUserMutation();
  const refreshServer = useServerRefresher();
  const { handleChange, handleSubmit, formValues, formErrors } = useForm(
    {
      email: "",
      password: ""
    },
    loginValidations,
    loginUser
  );

  useEffect(() => {
    if (data) {
      refreshServer();
    }
  }, [data, refreshServer]);

  return (
    <div className={Styles.login}>
      {/* <LoginImage /> */}
      {error && <h1>ERRORR</h1>}
      <h1 className={Styles.title}>Log In</h1>
      <Form
        formFields={formFields}
        formErrors={formErrors}
        userData={formValues}
        handleChange={handleChange}
      />
      <small>
        Don&apos;t you have account?{" "}
        <Link href={"/Signin"}>
          <a className={Styles.signinLink}>Sign in</a>
        </Link>
        !
      </small>
      <div className={Styles.buttonContainer}>
        <Button type="primary" onClIick={handleSubmit}>
          Login <RiLoginBoxFill />
        </Button>
      </div>
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
