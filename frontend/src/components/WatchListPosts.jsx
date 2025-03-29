import { useShareContext } from './components/Watchlist';

const { addWatchList } = useShareContext();

//set inital watchLists to 0
const [watchLists, setWatchList] = useState(0);

const [watchListItem, setWatchListItem] = useState(Array.isArray(postObject) ? postObject : [])

const handleWatchlistClick = async (postSlug, title) => {
    console.log(postSlug);

    const newWatchListDetails = watchListItem.find(
        (post) => post.slug === postSlug
        );

    console.log(newWatchListDetails);

    if (newWatchListDetails) {
        console.log(newWatchListDetails); //logs the details into the console
        addWatchList(newWatchListDetails);
        setWatchList((prevWatchList) => prevWatchList + 1);
        const titleDetails = watchListItem.find((Post) => Post.title === title;
        alert('Post added to watchlist :)');
        } else {
            console.error(`Post with ID ${postSlug} not found`)
            }
    };

<div>
            <FaBookMark //renders react bookmark icon
            className = "watchListIcon"
            title = "WatchList"
            alt = "WatchList" //alt text for screen readers
            onClick = {(e) => //performs necessary actions to get a post into watchlist
                handleWatchlistClick(post.slug, post.title)
                }
            />
        </div>