import React from "react";
import { userFromRequest } from "@/web/tokens";
import { User } from "@prisma/client";
import { GetServerSidePropsContext, NextPage } from "next";
import userStyles from "./user.module.css";
import Form from "@/components/Form/Form";
import useForm from "@/hooks/useForm";
import changeUserDataFormFields from "../../utils/optionsToChange";
import { useUpdateUserMutation } from "@/store/services/UsersService";
import signinValidations from "../../utils/signinValidations";
import Button from "@/components/Button/Button";
import { MdTipsAndUpdates } from "react-icons/md";

const UserPage: NextPage<{ user: User }> = ({ user }): JSX.Element => {
  const [updateUser] = useUpdateUserMutation();
  const { formErrors, formValues, handleChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
      username: "",
      repeatPassword: ""
    },
    signinValidations,
    updateUser
  );
  return (
    <div className={userStyles.user}>
      <h1 className={userStyles.userGreeting}>
        Hello <span className={userStyles.userGreeting__name}>{user.username}</span>!
      </h1>

      <div className={userStyles.userOptions}>
        <div>
          <h3 className={userStyles.userOptions__title}>Change your data</h3>
        </div>
        <div>
          <Form
            formFields={changeUserDataFormFields}
            formErrors={formErrors}
            formData={formValues}
            handleChange={handleChange}
          />
        </div>
        <Button onClIick={handleSubmit} type="primary">
          <MdTipsAndUpdates />
          Update {user.username}
        </Button>
      </div>
    </div>
  );
};

export async function getServerSideProps(constext: GetServerSidePropsContext) {
  const user = await userFromRequest(constext.req);
  if (user) {
    return {
      props: {
        user: JSON.parse(JSON.stringify(user))
      }
    };
  }

  return {
    redirect: {
      destination: "/Login",
      permanent: false
    }
  };
}

export default UserPage;
