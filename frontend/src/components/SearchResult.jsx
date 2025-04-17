import React from "react";
import { useNavigate } from 'react-router-dom'

import "./SearchResult.css";

export const SearchResult = ({ result }) => {

  const navigate = useNavigate();

const handleRedirect = (result) => {
  navigate(`http://localhost:5176/api/posts/${result.id}`)
}

  return (
    <div
      className="search-result"
      // onClick={(e) => alert(`You clicked on ${result}`)}
      onClick={handleRedirect}
    >
      {result}
    </div>
  );
};