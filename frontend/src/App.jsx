import { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate, useLocation } from 'react-router-dom';
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
import CustomNavbar from './components/Navbar';
import Profile_Page from './components/Profile_Page';


function App() {
  const location = useLocation();
  const { isLoading, isAuthenticated } = useAuth0();
  const passwordLogin = localStorage.getItem('passwordLogin') === 'true';

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (location.pathname === '/' && (isAuthenticated || passwordLogin)) {
    return <Navigate to="/posts" replace />;
  }

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


          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/update-profile/:id" element={<CreateProfile />} />
            <Route path="/posts" element={<Discussion />} />
             <Route path="/profile/:id" element={<Profile_Page />} />


          </Routes>


      );
 }

export default App;
