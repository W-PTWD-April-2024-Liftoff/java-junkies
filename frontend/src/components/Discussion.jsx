import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";

const Discussion = () => {
    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

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

    return (
        <div>
            <h1>Discussion Board</h1>
            <CreatePost onPostCreated={fetchPosts} />
            {currentPost ? <EditPost post={currentPost} onUpdate={() => {setCurrentPost(null)}} onCancel={() => {}}/> : null}
            <div className="post-list">
                {posts.map((post) => (
                    <>
                        <div key={post.id} className="post">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <button onClick={() => {
                                setCurrentPost(post);
                            }}>Edit</button>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default Discussion;