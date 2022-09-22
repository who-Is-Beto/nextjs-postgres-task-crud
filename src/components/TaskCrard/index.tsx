import { Task } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Button from "../Button/Button";
import TaskCardStyles from "./TaskCard.module.css";
import { GrEdit } from "react-icons/gr";

const TaskCard: React.FC<{ task: Task; username: string }> = ({
  task: { title, status, description, id },
  username
}): JSX.Element => {
  return (
    <Link href={`/Tasks/${username}/${id}`}>
      <a>
        <div className={TaskCardStyles.taskCard}>
          <div className={TaskCardStyles.taskCard__header}>
            <small className={TaskCardStyles.taskCard__status}>{status}</small>
            <div>
              <Button href={`/Tasks/edit/${username}/${id}`} type="info">
                <GrEdit />
              </Button>
            </div>
          </div>
          <h4>{title}</h4>
          <div className={TaskCardStyles.taskCard__descript}>
            <p>{description}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default TaskCard;
