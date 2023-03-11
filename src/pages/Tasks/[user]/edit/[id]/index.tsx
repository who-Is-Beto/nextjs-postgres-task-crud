import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useUpdateTaskMutation } from '@/store/services/TasksService';
import TaskView from '@/views/TaskView';
import { getTask } from '@/lib/tasks';
import { Task } from '@prisma/client';
import Loader from '@/components/Loader';
import { useEffect } from 'react';
import { ShowToast } from '@/components/Toast';
import { useRouter } from 'next/router';

const EditTask: NextPage<{ task: Task }> = ({ task }): JSX.Element => {
  const [updateTask, { isLoading, error, isSuccess, isError }] = useUpdateTaskMutation();
  const router = useRouter();

  useEffect((): void => {
    if (isSuccess) {
      ShowToast({ label: 'Task Crated c:', type: 'success' });
      setTimeout(() => {
        router.push(`/Tasks`);
      }, 1000);
      return;
    }
    if (isError) {
      ShowToast({ label: `${error} :c`, type: 'error' });
    }
  }, [isSuccess, isError]);
  return (
    <>
      {task && (
        <TaskView
          title="Edit your"
          greenText="Task!"
          buttonLabel="Edit task"
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
          mutation={updateTask}
          task={task}
        />
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const task = await getTask(Number(params?.id));
    return {
      props: {
        task: JSON.parse(JSON.stringify(task)),
      },
      revalidate: 5,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default EditTask;
