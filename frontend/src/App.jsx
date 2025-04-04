import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import ProfilePage from "./components/ProfilePage";
import Register from './components/Register';
import Login from './components/Login';
import Auth0Login from './components/Auth0Login';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import Discussion from './components/Discussion';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}


// function App() {
//
//   return (
//     <>
//         <div>
//           < ProfilePage/>
//         </div>
//
//         <div>
//         < Register/>
//         </div>
//
//         <div>
//         < Login/>
//         </div>
//
//         <div>
//         < Auth0Login/>
//         </div>
//
//         <div>
//           < Discussion />
//
//         </div>
//     </>
//   )
// }
//
export default App
