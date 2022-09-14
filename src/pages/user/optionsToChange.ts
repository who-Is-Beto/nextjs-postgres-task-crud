import { IUserLoginType } from "shimps";

const changeUserDataFormFields: IUserLoginType[] = [
  {
    name: "username",
    placeholder: "Juan",
    type: "text",
    label: "Username"
  },
  {
    placeholder: "your_email@email.com",
    type: "email",
    name: "email",
    label: "Email"
  },
  {
    name: "password",
    placeholder: "password",
    type: "password",
    label: "Password"
  },
  {
    name: "repeatPassword",
    placeholder: "repeat password",
    type: "password",
    label: "Repeat password"
  }
];

export default changeUserDataFormFields;
