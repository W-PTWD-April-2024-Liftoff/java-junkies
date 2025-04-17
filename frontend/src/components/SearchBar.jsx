import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import {useAuth0} from '@auth0/auth0-react';
import { buildAuthHeader } from "../utils/buildAuthHeader";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const {getAccessTokenSilently} = useAuth0();

  const fetchData = async (value) => {
    try {
      const headers = await buildAuthHeader({getAccessTokenSilently});
      const response = await fetch("http://localhost:5176/api/posts", {
        method: 'GET',
        credentials: 'include',
        headers,
       });

       if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
       }
    
    //  fetch("http://localhost:5176/api/posts", {
    //   method: 'GET',
    //   credentials: 'include'
    //  })
    //"https://jsonplaceholder.typicode.com/users"
      // .then((response) => response.json())
      // .then((posts) => {
        const posts = await response.json();
        const searchTerm = value.toLowerCase();
        const results = posts.filter((post) => {
          const titleMatch = post.title?.toLowerCase().includes(searchTerm);
          const contentMatch = post.content?.toLowerCase().includes(searchTerm);

          return searchTerm && (titleMatch || contentMatch);
      });
      setResults(results);
    } catch (error) {
      console.error('search failed: ', error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};