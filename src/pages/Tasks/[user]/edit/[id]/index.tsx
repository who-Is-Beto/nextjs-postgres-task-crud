import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useUpdateTaskMutation } from "@/store/services/TasksService";
import TaskView from "@/views/TaskView";
import { getTask } from "@/lib/tasks";
import { Task } from "@prisma/client";

const EditTask: NextPage<{task: Task}> = ({task}): JSX.Element => {
  const [editTask, { isLoading, isSuccess, isError }] = useUpdateTaskMutation();

  return (

    <>
    {!task && <h1>Loading...</h1>}
    {task && <TaskView
    title="Edit your"
    greenText="Task!"
    buttonLabel="Edit task"
    isError={isError}
    isSuccess={isSuccess}
    isLoading={isLoading}
    mutation={editTask}
    task={task}
    />}
    </>
    )
  
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const task = await getTask(Number(params?.id));
    return {
      props: {
        task: JSON.parse(JSON.stringify(task))
      },
      revalidate: 5
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true
  };
};

export default EditTask;
