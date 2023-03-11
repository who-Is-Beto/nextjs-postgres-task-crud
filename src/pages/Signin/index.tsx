import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import useForm from "@/hooks/useForm";
import { useServerRefresher } from "@/hooks/useServerRefresher";
import { useCreateUserMutation } from "@/store/services/UsersService";
import { userFromRequest } from "@/web/tokens";
import { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import Styles from "./Signin.module.css";
import signinFormFields from "../../utils/signinFormFields";
import signinValidations from "../../utils/signinValidations";
import ErrorMessenge from "@/components/Error/ErrorMessage";
import LoginImage from "../../assets/images/login.svg";
import { ShowToast } from "@/components/Toast";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { DataResponseMessage } from "shimps";

const SignIn: NextPage = (): JSX.Element => {
  const [createUser, { error, data, isSuccess, isError, isLoading }] = useCreateUserMutation();
  const refreshServer = useServerRefresher();
  const router = useRouter();
  const { formErrors, formValues, handleChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
      username: "",
      repeatPassword: ""
    },
    signinValidations,
    createUser
  );

  useEffect((): void => {
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
    <div className={Styles.container}>
      <div className={Styles.signinImage}>
        <LoginImage />
      </div>
      <div className={Styles.signin}>
        <h1 className={`green ${Styles.title}`}>Sign In</h1>
        <Form
          formFields={signinFormFields}
          formErrors={formErrors}
          formData={formValues}
          handleChange={handleChange}
        />
        <div className={Styles.buttonContainer}>
          <small>
            You already have an account?{" "}
            <Link href={"/Login"}>
              <a className={Styles.signinLink}>Log in</a>
            </Link>
            !
          </small>
          <Button type="primary" onClIick={handleSubmit}>
            Create account
          </Button>
          {isError && <ErrorMessenge message={(error as {data: DataResponseMessage}).data.message} />}
        </div>
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

export default SignIn;
