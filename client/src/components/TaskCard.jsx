function TaskCard({ task }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h4>{task.title}</h4>

      <p>{task.description}</p>

      <small>{task.stage}</small>
    </div>
  );
}

export default TaskCard;