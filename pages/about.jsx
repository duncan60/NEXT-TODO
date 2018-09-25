import Layout from '../components/Layout';

export default () => (
  <Layout>
    <img src='/static/next-js-logo.png' />
    <p>
      This is about NEXT Practice Project
    </p>
    <p>{ process.env.TEST }</p>
  </Layout>
);
