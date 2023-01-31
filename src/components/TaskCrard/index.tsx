import { Task } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Button from "../Button/Button";
import TaskCardStyles from "./TaskCard.module.css";
import { GrEdit } from "react-icons/gr";
import { BsFillTrashFill } from "react-icons/bs";
import { TaskTates } from "shimps";

const TaskCard: React.FC<{
  task: Task;
  setDraggedTask?: React.Dispatch<React.SetStateAction<Task | null>>;
  username?: string;
  handleModal?: (newIsOpen: boolean, task?: Task) => void;
}> = ({ task, username, handleModal, setDraggedTask }): JSX.Element => {
  const { title, status, description, id } = task;

  const handleDelete = (
    event: React.SyntheticEvent<Element, Event>,
    task: Task
  ) => {
    if (handleModal) {
      event.preventDefault();
      handleModal(true, task);
    }
  };

  const handleStartDrag = (event: React.DragEvent<HTMLAnchorElement>): void => {
    if (setDraggedTask) {
      setDraggedTask(task);
    }
  };

  return (
    <LinkToCover setDraggedTask={handleStartDrag} id={id} username={username}>
      <div className={TaskCardStyles.taskCard}>
        <div className={TaskCardStyles.taskCard__header}>
          <small className={TaskCardStyles.taskCard__status}>{status}</small>
          <div className={TaskCardStyles.taskCard__buttons}>
            <Button
              onClIick={(event) => handleDelete(event, task)}
              type="danger"
            >
              <BsFillTrashFill fill="#222831" />
            </Button>
            <Button
              href={username ? `/Tasks/${username}/edit/${id}` : ""}
              type="info"
            >
              <GrEdit />
            </Button>
          </div>
        </div>
        <h4 className={TaskCardStyles.title}>{title}</h4>
        <p className={TaskCardStyles.taskCard__description}>{description}</p>
      </div>
    </LinkToCover>
  );
};

const LinkToCover: React.FC<{
  children: JSX.Element;
  username?: string;
  setDraggedTask: (event: React.DragEvent<HTMLAnchorElement>) => void;
  id: number;
}> = ({ children, id, setDraggedTask, username }): JSX.Element => {
  const handleDragStart = (event: React.DragEvent<HTMLAnchorElement>): void => {
    setDraggedTask(event);
  };
  if (username) {
    return (
      <Link href={`/Tasks/${username}/${id}`}>
        <a
          draggable
          onDragStart={handleDragStart}
          className={TaskCardStyles.taskCard__anchor}
        >
          {children}
        </a>
      </Link>
    );
  }
  return <div className={TaskCardStyles.taskCard__anchor}>{children}</div>;
};

export default TaskCard;
