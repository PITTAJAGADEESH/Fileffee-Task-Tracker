import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const editTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  const filteredAndSortedTasks = tasks
    .filter((task) =>
      filterStatus === "All" ? true : task.status === filterStatus
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
    });

  return (
    <div>
      <Header />
      <div className="container">
        <TaskForm addTask={addTask} />
        <div className="d-flex justify-content-between my-3">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort by Due Date (Ascending)</option>
            <option value="desc">Sort by Due Date (Descending)</option>
          </select>
        </div>
        <TaskList
          tasks={filteredAndSortedTasks}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default App;
