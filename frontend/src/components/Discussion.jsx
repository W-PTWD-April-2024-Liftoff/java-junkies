import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import CreateComment from "./CreateComment"

const Discussion = () => {
    const [posts, setPosts] = useState([]);
    //const [currentPost, setCurrentPost] = useState(null);
    const [editingPost, setEditingPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchPosts();
        fetchComments();
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


        //comment section

        const fetchComments = async () => {
            try {
                const response = await fetch("http://localhost:8080/comments");
    
                if (!response.ok) {
                    throw new Error(`HTTP error!! Status: ${response.status}`);
                }
    
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        const handleComment = async(id) => {

            try {
                const response = await  fetch(`http://localhost:8080/posts/${id}`,{
                    method : "POST"
                });

                if(!response.ok){
                    throw new Error(`HTTP error!! Status: ${response.status}`);
                }

                console.log("Comment created succesfully!!");
                
            } catch (error) {
                console.error("Error creating comment", error);
            }
        };

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
                            <button onClick={() => handleComment(post.id)}>Comment</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
};

      
export default Discussion;