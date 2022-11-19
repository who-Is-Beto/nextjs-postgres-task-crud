import Button from "@/components/Button/Button";
import { Task } from "@prisma/client";
import React from "react";
import Styles from "./DeleteTask.module.css";
import { useDeleteTaskMutation } from "@/store/services/TasksService";

const DeleteTask: React.FC<{ task: Task; openHandler: (newIsOpen: boolean) => void }> = ({
  task,
  openHandler
}) => {
  const [deleteTask, { isLoading, isError }] = useDeleteTaskMutation();
  const handleDelete = (): void => {
    deleteTask(task.id);
    if (isError) return;
    openHandler(false);
  };
  return (
    <div className={Styles.deleteView}>
      <div className={Styles.information}>
        <strong>Are you sure you want to delete this task?</strong>
        <h3 className="green">{task.title}</h3>
      </div>
      {isError && <p className="red">Unexpected error</p>}
      <div className={Styles.buttons}>
        <Button onClIick={() => openHandler(false)} type="secondary">
          Cancel
        </Button>
        <Button onClIick={handleDelete} type="danger">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteTask;
