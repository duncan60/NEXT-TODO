import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from '../components/Layout';
import TodoItem from '../components/TodoItem';
import { addTodoItem, clearTodoItem, changeAllItem, completeTodoItem } from '../store';

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    if (process.browser) {
      // client-side-only code
      console.log('client side');
    }
  }
  changeHandler(e) {
    this.setState({ text: e.target.value });
  }
  submitHandler(e) {
    if(e.charCode == 13){
      e.preventDefault();
      if (!this.state.text.length) {
        return;
      }
      this.setState(state => ({
        text: '',
      }));
      this.props.addTodoItem(this.state.text);
    }
  }
  clearItemHandler = (id) => {
    this.props.clearTodoItem(id);
  }
  changeAllStatusHandler = () => {
    this.props.changeAllItem();
  }
  completeItemHandler = (id) => {
    this.props.completeTodoItem(id);
  }
  render() {
    const { todos } = this.props;
    return (
      <Layout>
        <section className="todoapp">
          <header className="header">
            <h1 >todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.changeHandler}
              onKeyPress={this.submitHandler}
              value={this.state.text}
            />
            <label ></label>
          </header>
          <section className="main">
            <input 
              id="toggle-all"
              className="toggle-all" 
              type="checkbox"
              checked={todos.isTodoAll}
              onChange={this.changeAllStatusHandler}
            />
            <label htmlFor="toggle-all"></label>
            <ul className="todo-list">
              {
                todos.items.map(item => (
                  <TodoItem
                    key={item.id}
                    onClear={this.clearItemHandler}
                    onComplete={this.completeItemHandler}
                    {...item} 
                  />
                ))
              }
            </ul>
          </section>
        </section>
      </Layout>
    );
  }
}

Todos.getInitialProps = async function({ reduxStore }) {
  const isClientOrServer = (typeof window !== 'undefined' && window.document) ? 'client' : 'server';
  console.log(reduxStore.getState());
  console.log('---------');
  console.log(`isClientOrServer: ${isClientOrServer}`);

  return { isClientOrServer };
};

export default connect(
  state=> ({
    todos: state.todos,
  }),
  dispatch => bindActionCreators({
    addTodoItem,
    clearTodoItem,
    changeAllItem,
    completeTodoItem,
  }, dispatch)
)(Todos);
