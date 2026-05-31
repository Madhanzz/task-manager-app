import { useState } from "react";

function TaskForm({ onCreateTask }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreateTask(task);

    setTask({
      title: "",
      description: "",
      stage: "Todo",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
        required
      />

      <br /><br />

      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
      />

      <br /><br />

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

      <br /><br />

      <button type="submit">
        Create Task
      </button>
    </form>
  );
}

export default TaskForm;