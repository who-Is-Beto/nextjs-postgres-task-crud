import Button from "@/components/Button/Button";
import { Task } from "@prisma/client";
import React from "react";

const DeleteTask: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div>
      <h1>Are you sure you want to delete this task?</h1>
      <h2>{task.title}</h2>
      <Button type="primary">Cancel</Button>
      <Button type="danger">Delete</Button>
    </div>
  );
};

export default DeleteTask;
