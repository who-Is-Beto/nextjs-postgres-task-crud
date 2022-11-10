import React from 'react'
import Button from '@/components/Button/Button';
import Styles from "./NotificationOption.module.css";
import { Task, User } from '@prisma/client';

const NotificationOption: React.FC<{id: number; username: string}> = ({
  id,
  username
}): JSX.Element => {

  return (
    <div className={Styles.notification__option}>
      <span className={Styles.notification__option__title} >What would you like to do?</span>
      <div className={Styles.notification__buttons}>
        <Button type='danger'>Delete</Button>
        <Button href={`/Tasks/${username}/edit/${id}`} type='info'>Edit</Button>
      </div>
    </div>
  )
}

export default NotificationOption