import { IUserLoginType } from "shimps";

const formFields: IUserLoginType[] = [
  {
    placeholder: "your_email@email.com",
    type: "email",
    name: "email"
  },
  {
    name: "password",
    placeholder: "password",
    type: "password"
  }
];

export default formFields;
