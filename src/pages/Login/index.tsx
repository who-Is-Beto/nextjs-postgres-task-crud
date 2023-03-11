import React, { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import Link from "next/link";
import Styles from "./login.module.css";
import { useLoginUserMutation } from "@/store/services/UsersService";
import { RiLoginBoxFill } from "react-icons/ri";
import { GetServerSidePropsContext, NextPage } from "next";
import { userFromRequest } from "@/web/tokens";
import useForm from "../../hooks/useForm";
import loginValidations from "../../utils/validations";
import formFields from "../../utils/formFields";
import { useServerRefresher } from "@/hooks/useServerRefresher";
import ErrorMessenge from "@/components/Error/ErrorMessage";
import LoginImage from "../../assets/images/login.svg";
import { DataResponseMessage } from "shimps";
import { ShowToast } from "@/components/Toast";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

const Login: NextPage = (): JSX.Element => {
  const [loginUser, { data, isError, error, isSuccess, isLoading }] = useLoginUserMutation();
  const router = useRouter();
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
    if (isSuccess) {
      ShowToast({ label: "Task Crated c:", type: "success" });
        router.push(`/Tasks`);
      return;
    }
    if (isError) {
      ShowToast({ label: `${error} :c`, type: "error" });
    }
  }, [data, refreshServer]);

  if(isLoading) {
    return <Loader type="bars" />
  }

  return (
    <div className={Styles.loginContainer}>
      <div className={Styles.login}>
        <h1 className={Styles.title}>Log In</h1>
        <div className={Styles.formContainer}>
          <Form
            formFields={formFields}
            formErrors={formErrors}
            formData={formValues}
            handleChange={handleChange}
          />
          <div className={Styles.buttonContainer}>
            <small>
              Don&apos;t you have account?{" "}
              <Link href={"/Signin"}>
                <a className={Styles.signinLink}>Sign in</a>
              </Link>
              !
            </small>
            <Button type="primary" onClIick={handleSubmit}>
              Login <RiLoginBoxFill />
            </Button>
            {isError && <ErrorMessenge message={(error as {data: DataResponseMessage}).data.message} />}
          </div>
        </div>
      </div>
      <div className={Styles.loginImage}>
        <LoginImage />
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
