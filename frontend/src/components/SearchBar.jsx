import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
     fetch("http://localhost:5176/api/posts", {
      method: 'GET',
      credentials: 'include'
     })
    //"https://jsonplaceholder.typicode.com/users"
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((post) => {
          return (
            value &&
            post &&
            post.title &&
            post.title.toLowerCase().includes(value) &&
            post.content &&
            post.content.toLowerCase().includes(value)
          );
        }); //should filter the data in the backend if possible. This is just a start
        setResults(results);
      });
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