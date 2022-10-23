import { Task } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Button from "../Button/Button";
import TaskCardStyles from "./TaskCard.module.css";
import { GrEdit } from "react-icons/gr";
import { BsFillTrashFill } from "react-icons/bs";

const TaskCard: React.FC<{ task: Task; username: string }> = ({
  task: { title, status, description, id },
  username
}): JSX.Element => {
  const handleDelete = (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    console.log("TODO: delete task feature");
  };

  return (
    <Link href={`/Tasks/${username}/${id}`}>
      <a className={TaskCardStyles.taskCard__anchor}>
        <div className={TaskCardStyles.taskCard}>
          <div className={TaskCardStyles.taskCard__header}>
            <small className={TaskCardStyles.taskCard__status}>{status}</small>
            <div className={TaskCardStyles.taskCard__buttons}>
              <Button onClIick={(event) => handleDelete(event)} type="danger">
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
