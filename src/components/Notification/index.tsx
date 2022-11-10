
import React, { useRef, useState } from 'react'
import { Task, User } from '@prisma/client';
import NotificationStyles from './Notification.module.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import NotificationOption from './NotificationOption';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const Notification: React.FC<{task: Task, user: User}> = ({task, user}): JSX.Element => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const handleShowDropdown = (): void => setShowDropdown(!showDropdown);
  const notificationRef = useRef<HTMLDivElement>(null);
  const handleClickOutSide = () => setShowDropdown(false);
  useOnClickOutside(notificationRef, handleClickOutSide);

  return (
    <div ref={notificationRef} className={NotificationStyles.notification}>
      <span className={NotificationStyles.notification__title}>{task.title}</span>
      <span className={NotificationStyles.notification__date}>{new Date(task.dateToComplete as Date).toLocaleDateString("en-US")}</span>
      <button onClick={handleShowDropdown} className={NotificationStyles.notification__option}><BsThreeDotsVertical /></button>
      {showDropdown && <NotificationOption id={task.id} username={user.username}/>}
    </div>
  )
}

export default Notification