import { createContext, useContext, useState, useEffect } from "react";

const SharedContext = createContext();

export const useShareContext = () => useContext(SharedContext);

//loads the watchlist from local storage, will probably change to sql database later
//useState creates an intial state

export const ShareProvider = ({ children }) => {
    const [watchListPosts, setWatchListPosts] = useState(() => {
        const storedWatchList = JSON.parse(localStorage.getItem(LocalStorageKey));
        return Array.isArray(storedWatchList) ? storedWatchList : [];
        });

//adds new posts to user watchlist
    const addWatchList = (post) => {
        setWatchListPosts((prevWatchList) => [...prevWatchList, post]);
        };

//loads bookmarks from local storage
    useEffect(() => {
        try {
            const storedWatchList = JSON.parse(localStorage.getItem(LocalStorageKey));
            if (Array.isArray(storedWatchList)) {
                setWatchListPosts(storedWatchList);
                }
            } catch (err) {
                console.error("Error fetching watchlist", err);
                }
        }, []);

//updates state of watchlist when it changes
    useEffect(() => {
        localStorage.setItem(LocalStorageKey, JSON.stringify(watchListPosts));
        }, [watchListPosts]);

    const clearWatchlist = () => {
        localStorage.removeItem(LocalStorageKey);
        setWatchListPosts([]);
        };

    const

    };