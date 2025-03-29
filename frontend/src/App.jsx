import { useState } from 'react';
import './App.css'
import Register from './components/Register';
import Login from './components/Login';
import Auth0Login from './components/Auth0Login';
import { ShareProvider } from './components/WatchList';

function App() {

  return (
    <>
{/*     <Router> */}

{/*     <UserProvider> */}
{/*         <ShareProvider> */}

{/*             <Routes> */}

{/*             <Routes> */}

{/*         </ShareProvider> */}
{/*     </UserProvider> */}

        <div>
        < Register/>
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
