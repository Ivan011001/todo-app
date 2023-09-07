import { Component } from 'react';

export default class TodoForm extends Component {
  state = {
    newTodo: '',
  };

  onHandleChange = evt => {
    this.setState({ newTodo: evt.target.value });
  };

  onHandleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.newTodo);
    this.reset();
  };

  reset = () => {
    this.setState({ newTodo: '' });
  };

  render() {
    const { newTodo } = this.state;

    return (
      <form onSubmit={this.onHandleSubmit}>
        <input
          type="text"
          name="newTodo"
          value={newTodo}
          onChange={this.onHandleChange}
          pattern="\w+"
          required
          title="Please enter a valid word."
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}
