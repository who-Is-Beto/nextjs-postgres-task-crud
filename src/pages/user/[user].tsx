import React, { useEffect, useState } from 'react';
import { userFromRequest } from '@/web/tokens';
import { User } from '@prisma/client';
import { GetServerSidePropsContext, NextPage } from 'next';
import userStyles from './user.module.css';
import Form from '@/components/Form/Form';
import useForm from '@/hooks/useForm';
import changeUserDataFormFields from '../../utils/optionsToChange';
import { useUpdateUserMutation } from '@/store/services/UsersService';
import signinValidations from '../../utils/signinValidations';
import Button from '@/components/Button/Button';
import { MdTipsAndUpdates } from 'react-icons/md';
import ErrorMessenge from '@/components/Error/ErrorMessage';
import { SerializedError } from '@reduxjs/toolkit';
import LoginImage from '../../assets/images/login.svg';
import { ShowToast } from '@/components/Toast';
import { useRouter } from 'next/router';
import { DataResponseMessage } from 'shimps';

const UserPage: NextPage<{ user: User }> = ({ user }): JSX.Element => {
  const [updateUser, { error, isSuccess, isError }] = useUpdateUserMutation();
  const router = useRouter();
  const { formErrors, formValues, handleChange, handleSubmit } = useForm(
    {
      email: '',
      password: '',
      username: '',
      repeatPassword: '',
    },
    signinValidations,
    updateUser,
  );

  useEffect((): void => {
    if (isSuccess) {
      ShowToast({ label: 'Task Crated c:', type: 'success' });
      setTimeout(() => {
        router.push(`/Tasks/${user.username}`);
      }, 1000);
      return;
    }
    if (isError) {
      ShowToast({ label: `${error} :c`, type: 'error' });
    }
  }, [isSuccess]);
  return (
    <>
      <h1 className={userStyles.userGreeting}>
        Hello <span className={userStyles.userGreeting__name}>{user.username}</span>!
      </h1>
      <div className={userStyles.userContainer}>
        <div className={userStyles.user}>
          <div className={userStyles.formContainer}>
            <Form
              formFields={changeUserDataFormFields}
              formErrors={formErrors}
              formData={formValues}
              handleChange={handleChange}
            />
            <div className={userStyles.buttonContainer}>
              <Button type="primary" onClIick={handleSubmit}>
                <MdTipsAndUpdates />
                Update
              </Button>
              {isError && (
                <ErrorMessenge message={(error as { data: DataResponseMessage }).data.message} />
              )}
            </div>
          </div>
        </div>
        <div className={userStyles.userImage}>
          <LoginImage />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(constext: GetServerSidePropsContext) {
  const user = await userFromRequest(constext.req);
  if (user) {
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  }

  return {
    redirect: {
      destination: '/Login',
      permanent: false,
    },
  };
}

export default UserPage;
