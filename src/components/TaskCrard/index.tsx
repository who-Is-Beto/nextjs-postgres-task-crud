import { Task } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Button from "../Button/Button";
import TaskCardStyles from "./TaskCard.module.css";
import { GrEdit } from "react-icons/gr";
import { BsFillTrashFill } from "react-icons/bs";

const TaskCard: React.FC<{
  task: Task;
  username: string;
  handleModal: (newIsOpen: boolean, task?: Task) => void;
}> = ({ task, username, handleModal }): JSX.Element => {
  const handleDelete = (event: React.SyntheticEvent<Element, Event>, task: Task) => {
    event.preventDefault();
    handleModal(true, task);
    console.log("TODO: delete task feature");
  };

  const { title, status, description, id } = task;

  return (
    <Link href={`/Tasks/${username}/${id}`}>
      <a className={TaskCardStyles.taskCard__anchor}>
        <div className={TaskCardStyles.taskCard}>
          <div className={TaskCardStyles.taskCard__header}>
            <small className={TaskCardStyles.taskCard__status}>{status}</small>
            <div className={TaskCardStyles.taskCard__buttons}>
              <Button onClIick={(event) => handleDelete(event, task)} type="danger">
                <BsFillTrashFill fill="#222831" />
              </Button>
              <Button href={`/Tasks/${username}/edit/${id}`} type="info">
                <GrEdit />
              </Button>
            </div>
          </div>
          <h4>{title}</h4>
          <p className={TaskCardStyles.taskCard__description}>{description}</p>
        </div>
      </a>
    </Link>
  );
};

export default TaskCard;
