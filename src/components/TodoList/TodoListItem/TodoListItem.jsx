export default function TodoListItem({
  id,
  task,
  completed,
  onCompletedChange,
  onTodoDelete,
}) {
  return (
    <li>
      <input
        type="checkbox"
        name="completed"
        checked={completed}
        onChange={() => onCompletedChange(id)}
      />
      <span>{task}</span>
      <button type="button" onClick={() => onTodoDelete(id)}>
        Delete
      </button>
    </li>
  );
}
