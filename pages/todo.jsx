import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';

import '../static/style.scss';


class Todo extends React.Component {
  render() {
    const { id, todos:{ items } } = this.props;
    const target = items.filter(item => (
      item.id.toString() === id.toString()
    ));
    const text = target.length ? target[0].text : '';
    const status = target.length ? target[0].status : '';
    return (
      <Layout>
        <h1>{ `ID: ${id}` }</h1>
        <p> { `Desc: ${text}` }</p>
        <p> { `status: ${status}` }</p>
      </Layout>
    );
  }
};

Todo.getInitialProps = async function (context) {
  const { id } = context.query
  return { id }
}

export default connect(
  state=> ({
    todos: state.todos,
  })
)(Todo);