import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";

const Discussion = () => {
    const [posts, setPosts] = useState([]);
    //const [currentPost, setCurrentPost] = useState(null);
    const [editingPost, setEditingPost] = useState(null);
    const [rating, setRating] = useState(null);
    const [isRatingChanged, setIsRatingChanged] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, [editingPost, isRatingChanged]);

    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:8080/posts");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/posts/${id}`, {
                method : "DELETE"
            });

            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log("Post deleted successfully");
            fetchPosts();
        } catch (error) {
            console.error("Error deleting post:", error);
          }
        };
    const ratingMap = {
        5: "Excellent",
        4: "Very Good",
        3: "Good",
        2: "Fair",
        1: "Poor"
    }
    const displayRatings = (post) => {
        const summRatings =  post.ratings.reduce((accm, curr) => {
            if(accm[curr.rating]) {
                accm[curr.rating] = accm[curr.rating] + 1
            } else {
                accm[curr.rating] = 1
            }
            return accm; 
        }, {})
        return <div style={{display: "flex", justifyContent: "center", gap:"1rem"}}>
            {
                Object.keys(summRatings).sort().map(key => {
                    return <p><b>{ratingMap[key]}: </b>{summRatings[key]}</p>
                })
            }
        </div>
    }

    const handleRate = (post) => async () => {
        try {
            const response = await fetch(`http://localhost:8080/posts/${post.id}/rate`, {
                method : "PUT",
                headers : { "Content-Type": "application/json" },
                body : JSON.stringify({rating})
            });

            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("post updated:", data);
            setIsRatingChanged(true)
        } catch (error){
            console.error("Error updating post:", error);
        } 
    }

    return (
        <div>
        <h1>Discussion Board</h1>
        <CreatePost onPostCreated={fetchPosts} />
        <div className="post-list">
            {posts.map((post) => (
                <div key={post.id} className="post">
                    {editingPost === post.id ? (
                        <EditPost post={post} onUpdate={() => { fetchPosts(); setEditingPost(null); }} onCancel={() => setEditingPost(null)} />
                    ) : (
                        <>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <p><strong>Tags:</strong> {post.tags.map(tag => tag.name).join()}</p>  
                            <button onClick={() => setEditingPost(post.id)}>Edit</button>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                            <div>
                                <select id="rating" name="rating" onChange={(event) => {
                                    console.log(event.target.value)
                                    setRating(parseInt(event.target.value))
                                    setIsRatingChanged(false)
                                }}>
                                    <option value="">--Select rating--</option>
                                    <option value="1">1 - Poor</option>
                                    <option value="2">2 - Fair</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="5">5 - Excellent</option>
                                </select>
                                <button onClick={handleRate(post)}>Submit</button>
                                {
                                    displayRatings(post)
                                }
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
};

      
export default Discussion;