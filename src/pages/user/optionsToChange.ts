import { IUserLoginType } from "shimps";

const changeUserDataFormFields: IUserLoginType[] = [
  {
    name: "username",
    placeholder: "Juan",
    type: "text"
  },
  {
    placeholder: "your_email@email.com",
    type: "email",
    name: "email"
  },
  {
    name: "password",
    placeholder: "password",
    type: "password"
  },
  {
    name: "repeatPassword",
    placeholder: "repeat password",
    type: "password"
  }
];

export default changeUserDataFormFields;
