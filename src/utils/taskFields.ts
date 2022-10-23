import { FormField } from "shimps";

const taskFields: FormField[] = [
  {
    name: "title",
    placeholder: "Title",
    type: "text",
    label: "Title"
  },
  {
    name: "description",
    placeholder: "Description",
    type: "text",
    textArea: true,
    label: "Description"
  },
  {
    name: "dateToComplete",
    placeholder: "Date to complete",
    type: "date",
    label: "Date to complete"
  }
];

export default taskFields;
