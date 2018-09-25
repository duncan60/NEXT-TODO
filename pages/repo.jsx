import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';

const Repo =  (props) => (
    <Layout>
      <h1>{ props.repo.name }</h1>
      <p>{ props.repo.description }</p>
      <p>
          github: <a href={ props.repo.html_url } target="_blank">{ props.repo.html_url }</a>
      </p>
    </Layout>
)

Repo.getInitialProps = async function (context) {
  console.log('repo getInitialProps');
  let repo = {};
  const { name } = context.query;
  const res = await fetch(`https://api.github.com/repos/duncan60/${name}`);
  if (res.status === 200) {
    repo = await res.json();
  }
  return { repo }
}

export default Repo