import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

import API from "../services/taskApi";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] =
    useState(false);
  const [error, setError] =
    useState("");

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
      setError("");

      await API.delete(`/${id}`);

      fetchTasks();
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
      setError("");

      const task = tasks.find(
        (t) => t._id === id
      );

      await API.put(`/${id}`, {
        title: task.title,
        description: task.description,
        stage: newStage,
      });

      fetchTasks();
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
    return <h2>Loading Tasks...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Task Dashboard</h1>

        <Link to="/create-task">
          <button>
            Create Task
          </button>
        </Link>
      </div>

      {error && (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
          }}
        >
          {error}
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        <div>
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

        <div>
          <h2>In Progress</h2>

          {inProgressTasks.length ===
          0 ? (
            <p>No tasks</p>
          ) : (
            inProgressTasks.map(
              (task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={
                    deleteTask
                  }
                  onUpdate={
                    updateTask
                  }
                />
              )
            )
          )}
        </div>

        <div>
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