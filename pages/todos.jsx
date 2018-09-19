import Layout from '../components/Layout';
import TodoItem from '../components/TodoItem';

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
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
      const newItem = {
        text: this.state.text,
        id: Date.now(),
        status: 'todo',
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: '',
      }));
    }
  }
  clearItemHandler = (id) => {
    const items = this.state.items.filter(item => item.id !== id);
    this.setState(state => ({
      items,
    }));
  }
  completeItemHandler = (id) => {
    const items = this.state.items.map(item => 
      item.id === id ?
      {
        ...item,
        status: item.status === 'completed' ? 'todo' : 'completed',
      }:
      item
    );
    this.setState(state => ({
      items,
    }));
  }
  render() {
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
          <ul className="todo-list">
            {
              this.state.items.map(item => (
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
      </Layout>
    );
  }
}

export default Todos;
