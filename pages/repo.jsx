import React from 'react';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';

class Repo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repo: {
        description: '',
        html_url: '',
      },
     };
  }
  async componentDidMount() {
    fetch(`${ process.env.GITHUB_API }/repos/duncan60/${ this.props.name }`)
      .then( r => r.json() )
      .then( data => {
        this.setState({
          repo: {
            description: data.description,
            html_url: data.html_url,
          }
        });
      });
  }
  render() {
    const { name } = this.props;
    const { repo: { description, html_url }} = this.state;
    return (
      <Layout>
        <h1>{ name }</h1>
        <p>{ description }</p>
        <p>
          github: <a href={ html_url } target="_blank">{ html_url }</a>
        </p>
      </Layout>
    );
  }
}

Repo.getInitialProps = function (context) {
  console.log('repo getInitialProps');
  return { name: context.query.name }
}

export default Repo