import { User } from "@prisma/client";
import React from "react";
import AuthHome from "../../assets/images/AuthHome.svg";
import Styles from "./authenticated.module.css";

const Authenticated: React.FC<{ user: User }> = ({ user }): JSX.Element => {
  return (
    <div className={Styles.authContainer}>
      <div className={Styles.authImage}>
        <AuthHome />
      </div>
      <div className={Styles.authText}>
        <h1>Authentication Successful!</h1>
        <h3>
          hello <strong className="green">{user.username}</strong>!
        </h3>
        <p className={Styles.authText}>
          You have successfully authenticated with the server You can now
          navigate to the tasks.
        </p>
      </div>
    </div>
  );
};

export default Authenticated;
