import React, { useState } from "react";

const TaskItem = ({ task, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleEdit = () => {
    editTask(task.id, updatedTask);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
          />
        ) : (
          task.title
        )}
      </td>
      <td>
        {isEditing ? (
          <textarea
            className="form-control"
            value={updatedTask.description}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, description: e.target.value })
            }
          />
        ) : (
          task.description
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="date"
            className="form-control"
            value={updatedTask.dueDate}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, dueDate: e.target.value })
            }
          />
        ) : (
          task.dueDate
        )}
      </td>
      <td>
        {isEditing ? (
          <select
            className="form-control"
            value={updatedTask.status}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, status: e.target.value })
            }
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        ) : (
          task.status
        )}
      </td>
      <td>
        {isEditing ? (
          <button onClick={handleEdit} className="btn btn-success btn-sm">
            Save
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-warning btn-sm me-3"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TaskItem;
