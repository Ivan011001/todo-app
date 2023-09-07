import TodoListItem from './TodoListItem/TodoListItem';

export default function TodoList({ todos, onCompletedChange, onTodoDelete }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoListItem
          key={todo.id}
          id={todo.id}
          task={todo.task}
          completed={todo.completed}
          onCompletedChange={onCompletedChange}
          onTodoDelete={onTodoDelete}
        />
      ))}
    </ul>
  );
}
