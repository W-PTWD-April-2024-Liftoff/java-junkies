
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
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

  );
};

export default HomePage;
