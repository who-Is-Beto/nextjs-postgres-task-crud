import Loader from "@/components/Loader";
import Notification from "@/components/Notification";
import { useGetTasksByUserIdQuery } from "@/store/services/TasksService";
import ErrorView from "@/views/ErrorView";
import { userFromRequest } from "@/web/tokens";
import { Task, User } from "@prisma/client";
import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import Styles from "./NotificationUser.module.css";
import NotificationImage from "../../../assets/images/notifications.svg";
import { IncomingDatesTracked } from "@/constants";
import { useSelector } from "react-redux";
import { IStore } from "shimps";

const UserNotifications: NextPage<{ user: User }> = ({ user }): JSX.Element => {
  const { data, isLoading, isSuccess, isError } = useGetTasksByUserIdQuery({
    userId: user.id
  });
  const selectedTimeToNotify = useSelector(
    (state: { app: IStore }) => state.app.config.incomingTime
  );

  const incomingTasks = data?.tasks?.filter((task) => {
    const incomingDate = IncomingDatesTracked.get(selectedTimeToNotify);
    return (
      new Date(task.dateToComplete as Date).valueOf() <= new Date(incomingDate as Date).valueOf());
  });

  if (isLoading) {
    return <Loader type="bars" />;
  }

  return (
    <div className={Styles.notificationPage}>
      <h1 className={Styles.title}>
        Incoming <span className="green">Tasks</span>
      </h1>
      <div className={Styles.notificationContainer}>
        <div className={Styles.notificationImage}>
          <NotificationImage />
        </div>
        {isError && (
          <div className={Styles.notifications}>
            <ErrorView message="Something went wrong :c" />
          </div>
        )}
        {isSuccess && (
          <div className={Styles.notifications}>
            {!isLoading && !data?.tasks?.length && (
              <ErrorView message="You don't have any task notification :c" />
            )}
            {(incomingTasks as Task[]).map((task) => (
              <Notification key={task.id} user={user} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await userFromRequest(context.req);
  if (user) {
    return {
      props: {
        user: JSON.parse(JSON.stringify(user))
      }
    };
  }

  return {
    props: {}
  };
}

export default UserNotifications;
