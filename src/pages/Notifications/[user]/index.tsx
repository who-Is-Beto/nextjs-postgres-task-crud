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

const UserNotifications: NextPage<{ user: User }> = ({ user }): JSX.Element => {
  const { data, isLoading, isSuccess } = useGetTasksByUserIdQuery({
    userId: user.id
  });
  const incomingTasks = data?.tasks?.filter(
    (task: Task) => new Date(task.dateToComplete as Date) >= new Date()
  );

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
        {!isLoading && !data?.tasks?.length && (
          <ErrorView message="You dont have any task notification :c" />
        )}
        {isSuccess && (
          <div className={Styles.notifications}>
            {(incomingTasks as Task[]).map((task) => (
              <Notification key={task.id} user={user} task={task} />
            ))}
          </div>
        )}
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
    props: {}
  };
}

export default UserNotifications;
