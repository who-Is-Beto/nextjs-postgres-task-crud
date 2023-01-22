import { Task } from "@prisma/client";
import React from "react";

const Board: React.FC<{ tasks: Task[] }> = ({ tasks }): JSX.Element => {
  console.log("tasks", tasks);
  //TODO: Implement board with filters
  return (
    <div>
      <h1>Board</h1>
    </div>
  );
};

export default Board;
