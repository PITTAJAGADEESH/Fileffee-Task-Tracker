import React from "react";
import TaskItem from "../TaskItem";

const TaskList = ({ tasks, editTask, deleteTask }) => {
  return (
    <div className="task-list">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
