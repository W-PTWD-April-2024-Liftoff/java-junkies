
import React from 'react';
import { Link } from 'react-router-dom';
import "./HomePage.css";

const HomePage = () => {

  const darkMode = () => {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }

  return (
    <>
    <div>
    <button onClick={darkMode}>Prefer dark mode?</button>
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
