
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const userId = 2;

  return (
    <div>
      <h1>Welcome to In The Loop</h1>
      <p>
        <Link to={`/user/${userId}/profile`}>Go to Your Profile</Link>
      </p>
    </div>
  );
};

export default HomePage;
