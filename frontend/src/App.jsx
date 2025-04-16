import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (location.pathname === '/' && isAuthenticated) {
    return <Navigate to="/posts" replace />;
  }

      return (
       
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/update-profile/:id" element={<CreateProfile />} />
            <Route path="/posts" element={<Discussion />} />
          </Routes>

      );
 }

export default App;
