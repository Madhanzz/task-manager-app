import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

import API from "../services/taskApi";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/");

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (taskData) => {
    try {
      await API.post("/", taskData);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const todoTasks = tasks.filter(
    (task) => task.stage === "Todo"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.stage === "In Progress"
  );

  const doneTasks = tasks.filter(
    (task) => task.stage === "Done"
  );

  return (
    <div>
      <Navbar />

      <h1>Task Dashboard</h1>

      <TaskForm onCreateTask={createTask} />

      <hr />

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <div>
          <h2>Todo</h2>

          {todoTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
            />
          ))}
        </div>

        <div>
          <h2>In Progress</h2>

          {inProgressTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
            />
          ))}
        </div>

        <div>
          <h2>Done</h2>

          {doneTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;