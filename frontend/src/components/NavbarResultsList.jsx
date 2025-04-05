import React from "react";
import "./NavbarResultsList.css";
import { SearchResult } from "./SearchResult";

export const NavbarResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result.name} key={id} />;
      })}
    </div>
  );
};
