import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = (props) => (
  <Layout>
    <h1>My Github Profile</h1>
    <img style={{ width:'100px'}} src={props.profile.avatar_url}/>
    <p>{`Name: ${props.profile.name}`}</p>
    <ul>
      {props.repos.map((repo) => (
        <li key={repo.id}>
          <Link as={`/p/${repo.name}`} href={`/repo?name=${repo.name}`}>
            <a>{repo.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  console.log('Index getInitialProps');
  let profile = {};
  let repos = [];
  const res = await fetch(`${process.env.GITHUB_API}/users/duncan60`);
  if (res.status === 200) {
    profile = await res.json();
  } else {
    profile = {
      name: 'none',
      avatar_url: '',
    }
  }
  const res2 = await fetch(`${process.env.GITHUB_API}/users/duncan60/repos`);
  if (res2.status === 200) {
    repos = await res2.json();
  }
  const filterRepos = repos.map(({ id, name }) => ({
      id,
      name,
  }));
  return {
    profile:{
      name: profile.name,
      avatar_url: profile.avatar_url,
    },
    repos: filterRepos,
  };
};

export default Index;