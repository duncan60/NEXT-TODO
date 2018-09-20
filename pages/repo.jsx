import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';

import '../static/style.scss';

const Repo =  (props) => (
    <Layout>
       <h1>{props.repo.name}</h1>
       {/* <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
       <img src={props.show.image.medium}/> */}
    </Layout>
)

Repo.getInitialProps = async function (context) {
  const repo = {};
  const { name } = context.query;
  const res = await fetch(`https://api.github.com/repos/duncan60/${name}`);
  if (res.status === 200) {
    repo = await res.json();
  }
  return { repo }
}

export default Repo