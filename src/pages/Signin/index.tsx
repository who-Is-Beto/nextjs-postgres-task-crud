import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import useForm from "@/hooks/useForm";
import { useServerRefresher } from "@/hooks/useServerRefresher";
import { useCreateUserMutation } from "@/store/services/UsersService";
import { userFromRequest } from "@/web/tokens";
import { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import Styles from "../Login/login.module.css";
import signinFormFields from "../../utils/signinFormFields";
import signinValidations from "../../utils/signinValidations";

const SignIn: NextPage = (): JSX.Element => {
  const [createUser, { error, data }] = useCreateUserMutation();
  const refreshServer = useServerRefresher();
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

  useEffect(() => {
    if (data) {
      refreshServer();
    }
  }, [data, refreshServer]);
  return (
    <div className={Styles.login}>
      {error && <h1>ERRORR</h1>}
      <h1 className={Styles.title}>Sign In</h1>
      <Form
        formFields={signinFormFields}
        formErrors={formErrors}
        formData={formValues}
        handleChange={handleChange}
      />
      <small>
        You already have an account?{" "}
        <Link href={"/Login"}>
          <a className={Styles.signinLink}>Log in</a>
        </Link>
        !
      </small>
      <div className={Styles.buttonContainer}>
        <Button type="primary" onClIick={handleSubmit}>
          Create account
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

export default SignIn;
