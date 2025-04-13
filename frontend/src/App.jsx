import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'; 
import HomePage from './components/HomePage';
import CreateProfile from './components/CreateProfile';
import Register from './components/Register';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import Discussion from './components/Discussion';
import EditPost from './components/EditPost';
import Layout from './components/Layout';


function App() {

      return (

        // <Router>
        //   <Routes>
        //     <Route path="/" element={<HomePage />} />
        //     <Route path="/user/login" element={<Login />} />
        //     <Route path="/user/register" element={<Register />} />
        //     <Route path="/update-profile/:id" element={<ProfilePage />} />
        //   </Routes>
        // </Router>
      //   <div>
      //   <Discussion />
      // </div>
//     <Router>
      // <Layout>
      //   <Routes>
      //   <Route path="/posts" element={<Discussion />} />
      //   <Route path="/" element={<HomePage />} />
      //   <Route path="/user/login" element={<Login />} />
      
      // </Routes>
      // </Layout>
//     </Router>   

        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/update-profile/:id" element={<CreateProfile />} />
            <Route path="/posts" element={<Discussion />} />
          </Routes>
        </Router>

      );
 }

export default App;
