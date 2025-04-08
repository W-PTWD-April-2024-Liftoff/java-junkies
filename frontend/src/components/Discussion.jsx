import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import RatingPost from "./RatingPost";

const Discussion = () => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
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
    return (
        <div>
        <h1>Discussion Board</h1>
        <CreatePost onPostCreated={fetchPosts} />
        <div className="post-list">
            {posts.map((post) => (
                <div key={post.id} className="post-card">
                    {editingPost === post.id ? (
                        <EditPost post={post} onUpdate={() => { fetchPosts(); setEditingPost(null); }} onCancel={() => setEditingPost(null)} />
                    ) : (
                        <div>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <p><strong>Tags:</strong> {post.tags.map(tag => tag.name).join()}</p>  
                            <button onClick={() => setEditingPost(post.id)}>Edit</button>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                            <RatingPost post={post} setIsRatingChanged={setIsRatingChanged} />
                           </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
};

      
export default Discussion;