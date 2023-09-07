import { nanoid } from 'nanoid';
import { Component } from 'react';
import Section from './Section/Section';
import TodoForm from './TodoForm/TodoForm';
import TodoList from './TodoList/TodoList';
import TodoSearch from './TodoSearch/TodoSearch';

export default class App extends Component {
  state = {
    todos: [
      { id: 'id-1', task: 'eat  pizza', completed: false },
      { id: 'id-2', task: 'eat  soup', completed: false },
      { id: 'id-3', task: 'drink  water', completed: false },
      { id: 'id-4', task: 'drink milk', completed: false },
    ],
    filter: '',
    onlyCompleted: false,
  };

  onCompletedChange = id => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    }));
  };

  onTodoDelete = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  onFormSubmit = newTodo => {
    this.setState(prevState => ({
      todos: [
        { id: nanoid(), task: newTodo, completed: false },
        ...prevState.todos,
      ],
    }));
  };

  onFilterChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  onOnlyCompletedChange = () => {
    this.setState(prevState => ({
      onlyCompleted: !prevState.onlyCompleted,
    }));
  };

  onDeleteAlTodos = () => {
    this.setState({ todos: [] });
  };

  filterTodos = () => {
    const { todos, filter, onlyCompleted } = this.state;
    const normalizedFilter = filter.toLowerCase();

    if (onlyCompleted) {
      return todos.filter(todo => todo.completed);
    }
    return todos.filter(todo =>
      todo.task.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter, onlyCompleted } = this.state;
    const filteredTodos = this.filterTodos();

    return (
      <div>
        <Section title="Add new todo">
          <TodoForm onSubmit={this.onFormSubmit} />
        </Section>
        <Section title="Your todos">
          {filteredTodos.length !== 0 ? (
            <>
              <TodoSearch
                onChange={this.onFilterChange}
                onOnlyCompletedChange={this.onOnlyCompletedChange}
                filter={filter}
                onlyCompleted={onlyCompleted}
              />
              <TodoList
                onCompletedChange={this.onCompletedChange}
                onTodoDelete={this.onTodoDelete}
                todos={filteredTodos}
              />
              <button onClick={this.onDeleteAlTodos}>Delete all todos</button>
            </>
          ) : (
            <p>There are no todos yet...</p>
          )}
        </Section>
      </div>
    );
  }
}
