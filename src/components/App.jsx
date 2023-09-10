import { nanoid } from 'nanoid';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import Section from './Section/Section';
import TodoForm from './TodoForm/TodoForm';
import TodoList from './TodoList/TodoList';
import TodoSearch from './TodoSearch/TodoSearch';
import IconButton from './IconButton/IconButton';
import Modal from './Modal/Modal';

import { ReactComponent as AddIcon } from '../svg/add.svg';
import { ReactComponent as ExitIcon } from '../svg/exit.svg';

const modalRoot = document.querySelector('#modal-root');

export default class App extends Component {
  state = {
    todos: [],
    filter: '',
    onlyCompleted: false,
    modalIsVisible: false,
  };

  componentDidMount() {
    const parsedTodos = JSON.parse(localStorage.getItem('todos'));

    if (parsedTodos) this.setState({ todos: parsedTodos });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.todos !== prevState.todos)
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

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

    this.toggleModal();
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

  toggleModal = () => {
    this.setState(prevState => ({ modalIsVisible: !prevState.modalIsVisible }));
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
    const { todos, filter, onlyCompleted, modalIsVisible } = this.state;
    const filteredTodos = this.filterTodos();

    return (
      <div>
        <Section title="Add new todo">
          <IconButton onClick={this.toggleModal} aria-label="Add todo form">
            <AddIcon width="32" height="32" />
          </IconButton>

          {modalIsVisible &&
            createPortal(
              <Modal onClose={this.toggleModal}>
                <TodoForm onSubmit={this.onFormSubmit} />
                <IconButton onClick={this.toggleModal} aria-label="exit form">
                  <ExitIcon width="32" height="32" />
                </IconButton>
              </Modal>,
              modalRoot
            )}
        </Section>
        <Section title="Your todos">
          {todos.length !== 0 ? (
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
