import { useState } from 'react';
import './App.css'
import Register from './components/Register';
import Login from './components/Login';
import Auth0Login from './components/Auth0Login';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import Discussion from './components/Discussion';
import EditPost from './components/EditPost';


function App() {

  return (
    <>
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
          <Discussion/>
      
        </div>
    </>
  )
}

export default App
