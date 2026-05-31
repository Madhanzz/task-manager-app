import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

import API from "../services/taskApi";

import "../styles/dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/");

      setTasks(res.data);
    } catch (error) {
      setError("Failed to load tasks");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await API.delete(`/${id}`);

      setTasks((prevTasks) =>
        prevTasks.filter(
          (task) => task._id !== id
        )
      );
    } catch (error) {
      setError("Failed to delete task");
      console.log(error);
    }
  };

  const updateTask = async (
    id,
    newStage
  ) => {
    try {
      const task = tasks.find(
        (t) => t._id === id
      );

      await API.put(`/${id}`, {
        title: task.title,
        description: task.description,
        stage: newStage,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id
            ? {
                ...task,
                stage: newStage,
              }
            : task
        )
      );
    } catch (error) {
      setError("Failed to update task");
      console.log(error);
    }
  };

  const todoTasks = tasks.filter(
    (task) => task.stage === "Todo"
  );

  const inProgressTasks = tasks.filter(
    (task) =>
      task.stage === "In Progress"
  );

  const doneTasks = tasks.filter(
    (task) => task.stage === "Done"
  );

  if (loading) {
    return (
      <div className="dashboard-container">
        <h2>Loading Tasks...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-header">
        <h1>Task Dashboard</h1>

        <Link to="/create-task">
          <button className="create-btn">
            Create Task
          </button>
        </Link>
      </div>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      <div className="task-columns">
        <div className="column">
          <h2>Todo</h2>

          {todoTasks.length === 0 ? (
            <p>No tasks</p>
          ) : (
            todoTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))
          )}
        </div>

        <div className="column">
          <h2>In Progress</h2>

          {inProgressTasks.length === 0 ? (
            <p>No tasks</p>
          ) : (
            inProgressTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))
          )}
        </div>

        <div className="column">
          <h2>Done</h2>

          {doneTasks.length === 0 ? (
            <p>No tasks</p>
          ) : (
            doneTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;