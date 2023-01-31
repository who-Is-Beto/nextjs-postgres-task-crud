import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Task, User } from "@prisma/client";
import { TaskTates } from "shimps";
import TaskList from "../TaskList";
import { Modal } from "../Modal";
import DeleteTask from "../Modal/DeleteTask";
import Styles from "./Board.module.css";
import { useUpdateTaskMutation } from "@/store/services/TasksService";

const Board: React.FC<{ tasks: Task[]; user: User }> = ({
  tasks,
  user
}): JSX.Element => {
  const [filteredTasks, setFilteredTasks] = useState<{
    [key: string]: Task[];
  }>({
    pending: [],
    "in progress": [],
    done: []
  });
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [dragged, setDragged] = useState<Task | null>(null);
  const [newSatus, setNewStatus] = useState<TaskTates | null>(null);
  const [updateTask] = useUpdateTaskMutation();

  const handleDrop = (
    event: React.DragEvent & BaseSyntheticEvent<HTMLDivElement>
  ): void => {
    event.preventDefault();
    setNewStatus(event.target.id as TaskTates);
  };

  const handleModal = (newIsOpen: boolean, task?: Task): void => {
    setModal(newIsOpen);
    if (task) {
      setTaskToDelete(task);
    }
  };

  useEffect((): void => {
    const pending = tasks.filter((task) => task.status === "pending");
    const inProgress = tasks.filter((task) => task.status === "in progress");
    const done = tasks.filter((task) => task.status === "done");
    setFilteredTasks({
      pending,
      "in progress": inProgress,
      done
    });
  }, []);

  useEffect(() => {
    if (!modal) {
      setTaskToDelete(null);
    }
  }, [modal]);

  useEffect((): void => {
    if (dragged && newSatus) {
      const newTasks = filteredTasks[newSatus];
      const oldTasks = filteredTasks[dragged.status];
      const newDragged = { ...dragged, status: newSatus };
      const newFilteredTasks = {
        ...filteredTasks,
        [newSatus]: [...newTasks, newDragged],
        [dragged.status]: oldTasks.filter((task) => task.id !== dragged.id)
      };
      setFilteredTasks(newFilteredTasks);
      updateTask(newDragged);
      setDragged(null);
      setNewStatus(null);
    }
  }, [newSatus]);

  return (
    <>
      <h1>Board</h1>
      <div className={Styles.listContainer}>
        <TaskList
          id="pending"
          setDragged={setDragged}
          handleDrop={handleDrop}
          handleModal={handleModal}
          user={user}
          listTitle="pending"
          taskList={filteredTasks.pending || []}
        />
        <TaskList
          id="in progress"
          setDragged={setDragged}
          handleModal={handleModal}
          handleDrop={handleDrop}
          user={user}
          listTitle="in progress"
          taskList={filteredTasks["in progress"] || []}
        />
        <TaskList
          id="done"
          setDragged={setDragged}
          handleModal={handleModal}
          user={user}
          handleDrop={handleDrop}
          listTitle="done"
          taskList={filteredTasks.done || []}
        />
      </div>
      <Modal isOpen={modal} openHandler={handleModal}>
        <>
          <DeleteTask openHandler={handleModal} task={taskToDelete as Task} />
        </>
      </Modal>
    </>
  );
};

export default Board;
