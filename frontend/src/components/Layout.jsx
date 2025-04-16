import React from "react";
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from "./Header";
import Footer from './Footer';

const Layout = () => {
    return (
        <div>
          <Header />
          <main className="flex-1 p-4 bg-gray-50"><Outlet /></main>
          <Footer />
        </div>
      );
  };
  
  export default Layout;