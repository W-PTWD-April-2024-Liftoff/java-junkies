import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'; 
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import Register from './components/Register';
import Login from './components/Login';
import Auth0Login from './components/Auth0Login';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import Discussion from './components/Discussion';
import EditPost from './components/EditPost';
import Layout from './components/Layout';
import Profile_Page from './components/Profile_Page';


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
            <Route path="/update-profile/:id" element={<ProfilePage />} />
            <Route path="/posts" element={<Discussion />} />
            <Route path="/:id/profile" element={<Profile_Page />} />
          </Routes>
        </Router>

      );
 }

export default App;
