import React from "react";
import "./SearchBarResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchBarResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result.title} key={id} />;
      })}
    </div>
  );
};