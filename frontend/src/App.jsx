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
// import { ShareProvider } from './components/WatchList';


function App() {

  return (
    <div className='App'>

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

        const [results, setResults] = useState ([]);

        <div className = "searchBarContainer">
            <Navbar setResults = {setResults} />
            <NavbarResultsList results = {results} />
            </div>

    </div>
  );
}

export default App
