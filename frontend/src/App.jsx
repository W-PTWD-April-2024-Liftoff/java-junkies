import { useState } from 'react';
import './App.css'
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import Auth0Login from './components/Auth0Login';


function App() {

  return (
    <>
        <div>
        < CreateUser/>
        </div>

        <div>
        < Login/>
        </div>

        <div>
        < Auth0Login/>
        </div>
    </>
  )
}

export default App
