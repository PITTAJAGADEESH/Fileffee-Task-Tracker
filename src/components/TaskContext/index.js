import React, { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.status === filter;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return new Date(b.dueDate) - new Date(a.dueDate);
  });

  return (
    <TaskContext.Provider
      value={{
        tasks: sortedTasks,
        addTask,
        editTask,
        deleteTask,
        setFilter,
        setSortOrder,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
