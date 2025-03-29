import { useShareContext } from './components/WatchList';

const { watchListPosts, removeWatchlist, clearWatchList} = useShareContext();

return (
    <div className = "watchListContainer">
        { watchListPosts.length > 0 && (
            <>
            <div className = "navWatchList">
                <Link className = "linkGoBack" to = "/posts">
                    <FaBackward className = "return" title = "Go back" alt = "Go back" />
                </Link>

                <FaTimes
                    className = "clearAll"
                    onClick = { ClearAllBookmarks }
                    title = "Clear all"
                    alt = "Clear all"
                />
            </div>
            </>
        )}

    {watchListPosts.map((posts) => {
        return (
            <div className = "grid-container">
                <div key = { post.id } className = "posts">
                    <Link
                        className = "postLink"
                        to = {`/posts/${post.slug}?from=watchlist`}
                    >
                    </Link>

                    <FaTrash
                    className = "trash"
                    onClick = {() => handleRemoveWatchList(post.slug)}
                    title = "Delete Post from WatchList"
                    alt = "Delete Post from WatchList"
                    />
                </div>
            </div>
          );
        })}
    </div>
    );
}
