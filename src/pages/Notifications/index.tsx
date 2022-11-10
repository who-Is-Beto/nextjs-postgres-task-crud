import UnAuth from "@/components/unaAuth";
import { getTasks } from "@/lib/tasks";
import { userFromRequest } from "@/web/tokens";
import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";

const Notifications: NextPage = (): JSX.Element => {
  return <UnAuth message="Please login to get access to your personal tasks." />;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

  const user = await userFromRequest(context.req);
  if (user) {
    return {
      redirect: {
        destination: `/Notifications/${user.username}`,
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}
export default Notifications;
