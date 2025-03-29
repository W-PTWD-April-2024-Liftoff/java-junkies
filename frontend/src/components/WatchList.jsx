import { createContext, useContext, useState, useEffect } from "react";

const SharedContext = createContext();

export const useShareContext = () => useContext(SharedContext);

//loads the watchlist from local storage, will probably change to sql database later
//useState creates an initial state

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

//clears the whole watchlist
    const clearWatchlist = () => {
        localStorage.removeItem(LocalStorageKey);
        setWatchListPosts([]);
        };

//removes a specific post from the watchlist, updating the state by filtering out the post with it's postSlug
    const removeWatchList = (postSlug) => {
        setWatchListPosts((prevWatchList) =>
            prevWatchList.filter((post) => post.slug !== postSlug)
            );
        };

//value provided to SharedContext.Provider contains watchListPosts, with addWatchList, removeWatchList, and clearWatchlist.
//Makes it accessible to other components with useContext.
//SharedProvider contains all logic for managing watchlist and provides data to child components with SharedContext.Provider
//Should make it so we do not hav eto pass props manually
    return (
        <SharedContext.Provider
            value = {{ watchListPosts, addWatchList, removeWatchList, clearWatchlist }}
        >
        {children}
        </SharedContext.Provider>
        );

    };