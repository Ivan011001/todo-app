export default function TodoSearch({
  filter,
  onChange,
  onlyCompleted,
  onOnlyCompletedChange,
}) {
  return (
    <div>
      <input type="text" name="filter" value={filter} onChange={onChange} />
      <label>
        Show only completed
        <input
          type="checkbox"
          name="onlyCompleted"
          checked={onlyCompleted}
          onChange={onOnlyCompletedChange}
        />
      </label>
    </div>
  );
}
