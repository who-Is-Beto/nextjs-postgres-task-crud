import React from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import { userFromRequest } from "@/web/tokens";
import UnAuth from "@/components/unaAuth";

const User: NextPage = (): JSX.Element => {
  return <UnAuth message="Please login to get access to your personal tasks." />;
};

export default User;

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
