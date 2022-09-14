import { IUserLoginType } from "shimps";

const formFields: IUserLoginType[] = [
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
  }
];

export default formFields;
