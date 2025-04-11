import React from "react";
import { Link } from 'react-router-dom';
import Header from "./Header";
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-4 bg-gray-50">{children}</main>
          <Footer />
        </div>
      );
  };
  
  export default Layout;