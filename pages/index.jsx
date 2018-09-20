import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import '../static/style.scss';

const Index = (props) => (
  <Layout>
    <h1>My Github Profile</h1>
    <img style={{ width:'100px'}} src={props.profile.avatar_url}/>
    <p>{`Name: ${props.profile.name}`}</p>
    <ul>
      {props.repos.map((repo) => (
        <li key={repo.id}>
          <Link as={`/p/${repo.name}`} href={`/post?name=${repo.name}`}>
            <a>{repo.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);


Index.getInitialProps = async function() {
  let profile = {};
  let repos = [];
  const res = await fetch('https://api.github.com/users/duncan60');
  if (res.status === 200) {
    profile = await res.json();
  } else {
    profile = {
      name: 'none',
    }
  }
  const res2 = await fetch('https://api.github.com/users/duncan60/repos');
  if (res2.status === 200) {
    repos = await res2.json();
  } 

  return {
    profile,
    repos,
  };
};

export default Index;