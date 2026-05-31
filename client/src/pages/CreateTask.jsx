import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/taskApi";
import "../styles/createTask.css";

function CreateTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    stage: "Todo",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/", task);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <div className="create-container">
  <div className="create-card">
      <h1>Create Task</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
        />

        <br />
        <br />

        <select
          name="stage"
          value={task.stage}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Done">Done</option>
        </select>

        <br />
        <br />

        <button type="submit">
          Create Task
        </button>
      </form>
    </div>
     </div>
  );
}

export default CreateTask;