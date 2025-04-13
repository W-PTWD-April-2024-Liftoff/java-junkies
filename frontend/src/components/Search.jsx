import React, { useState, useEffect} from "react";

import Discussion from "./Discussion";
// import {content} from "./CreatePost";
// import Loader from "./Loading";

function Search () {

    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = fetch(`http://localhost:8080/posts?q=${query}`)
            setData(response.data);
        };
        if (query.length === 0 || query.length > 2) fetchData();
    }, [query])

    return (
        <div className="searchBar">
            <input type="text" 
            placeholder="Search..." 
            className="search" 
                onChange={e => setQuery(e.target.value)}
            />
            <Discussion data= {data}/>
        </div>
    )

}

export default Search