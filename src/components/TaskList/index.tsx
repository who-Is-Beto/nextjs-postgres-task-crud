import { Task, User } from "@prisma/client";
import React, { BaseSyntheticEvent } from "react";
import { TaskTates } from "shimps";
import TaskCard from "../TaskCrard";
import Styles from "./TaskList.module.css";

const TaskList: React.FC<{
  listTitle: TaskTates;
  id: TaskTates;
  user: User;
  taskList: Task[];
  setDragged?: React.Dispatch<React.SetStateAction<Task | null>>;
  handleDrop?: (
    event: React.DragEvent & BaseSyntheticEvent<HTMLDivElement>
  ) => void;
  handleModal?: (newIsOpen: boolean, task?: Task) => void;
}> = ({
  taskList,
  listTitle,
  handleDrop,
  setDragged,
  id,
  handleModal,
  user
}): JSX.Element => {
  const handleDragOver = (
    event: React.DragEvent & BaseSyntheticEvent<HTMLDivElement>
  ): void => {
    event.preventDefault();
  };
  return (
    <div
      id={id}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={Styles.taskListColumn}
    >
      <h2>{listTitle}</h2>
      <div className={Styles.taskList}>
        {taskList.map(
          (task): JSX.Element => (
            <TaskCard
              setDraggedTask={setDragged}
              handleModal={handleModal}
              username={user.username}
              key={task.id}
              task={task}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TaskList;
