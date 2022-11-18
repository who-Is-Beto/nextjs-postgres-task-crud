import Button from "@/components/Button/Button";
import { Task } from "@prisma/client";
import React from "react";

const DeleteTask: React.FC<{ task: Task; openHandler: (newIsOpen: boolean) => void }> = ({
  task,
  openHandler
}) => {
  return (
    <div>
      <strong>Are you sure you want to delete this task?</strong>
      <p>{task.title}</p>
      <div>
        <Button onClIick={() => openHandler(false)} type="primary">
          Cancel
        </Button>
        <Button type="danger">Delete</Button>
      </div>
    </div>
  );
};

export default DeleteTask;
