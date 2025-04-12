import { useState } from 'react';
import './App.css'
import Register from './components/Register';
import Login from './components/Login';
import Auth0Login from './components/Auth0Login';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import Discussion from './components/Discussion';
import { Navbar } from './components/Navbar';
import { NavbarResultsList } from './components/NavbarResultsList';


function App() {
  const [results, setResults] = useState([]);

  return (
    <div className='App'>

<div className = "searchBarContainer">
            <Navbar setResults = {setResults} />
            {results && results.length > 0 && <NavbarResultsList results={results} />}
            </div>

        <div>
        < Register/>
        </div>

        <div>
        < Login/>
        </div>

        <div>
        < Auth0Login/>
        </div>

        <div>
          < Discussion />
        </div>

        <div>
      <DarkMode />
    </div>

    </div>
  );
};

export default App
