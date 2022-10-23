import { FormField } from "shimps";

const formFields: FormField[] = [
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
