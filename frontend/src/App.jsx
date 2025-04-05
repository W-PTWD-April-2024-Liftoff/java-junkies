import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import Register from './components/Register';
import Login from './components/Login';
import Auth0Login from './components/Auth0Login';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import Discussion from './components/Discussion';
import EditPost from './components/EditPost';


function App() {

      return (

        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/update-profile/:id" element={<ProfilePage />} />
          </Routes>
        </Router>
      );

//   return (
//     <>
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
//           <Discussion/>
//
//         </div>
//     </>
//   )
 }

export default App
