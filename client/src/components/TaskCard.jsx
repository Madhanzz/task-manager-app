function TaskCard({
  task,
  onDelete,
  onUpdate,
}) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "10px",
        backgroundColor: "#fff",
      }}
    >
      <h4>{task.title}</h4>

      <p>{task.description}</p>

      <select
        value={task.stage}
        onChange={(e) =>
          onUpdate(task._id, e.target.value)
        }
      >
        <option value="Todo">Todo</option>

        <option value="In Progress">
          In Progress
        </option>

        <option value="Done">Done</option>
      </select>

      <br />
      <br />

      <button
        onClick={() => onDelete(task._id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;