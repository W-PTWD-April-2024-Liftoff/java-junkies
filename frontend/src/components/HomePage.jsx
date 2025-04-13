
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from "./Layout";

const HomePage = () => {

  return (
      <Layout>
    <>
    <div>
      <h1>Welcome to In The Loop</h1>
      <p>
        <Link to={`/user/login`}>Login</Link>
      </p>
    </div>
        <div>
            <p>
                <Link to={`/user/register`}>Register</Link>
             </p>
             </div>
             </>
             </Layout>

  );
};

export default HomePage;
