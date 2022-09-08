import React from "react";
import UnAuthStyle from "./UnAuthenticated.module.css";
import Button from "../../components/Button/Button";

const UnAuthenticated: React.FC = () => {
  return (
    <div className={UnAuthStyle.unAuthContainer}>
      <h1 className={UnAuthStyle.unAuthGreeting}>Hey!</h1>
      <p className={UnAuthStyle.unAuthMessage}>
        Did you know <strong className={UnAuthStyle.unAuthiTask}>iTask</strong>?
      </p>
      <p>
        <strong className={UnAuthStyle.unAuthiTask}>iTask</strong> is the app that helps you to take
        notes, make remiders and never forget them.
      </p>
      <p>
        Everywhere you go! <strong className={UnAuthStyle.unAuthiTask}>iTask</strong> is with you.
      </p>
      <div className={UnAuthStyle.unAuthInvitation}>
        <p>
          Do you want to prove <strong className={UnAuthStyle.unAuthiTask}>iTask</strong> for free?
        </p>
      </div>

      <div className={UnAuthStyle.unAuthButtons}>
        <Button type="dark" href="/Login">
          Login
        </Button>
        <Button type="secondary" href="/Signin">
          Signin
        </Button>
      </div>
    </div>
  );
};

export default UnAuthenticated;
