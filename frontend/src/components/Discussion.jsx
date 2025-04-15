import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import RatingPost from "./RatingPost";
import { useNavigate } from 'react-router-dom';

const Discussion = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [isRatingChanged, setIsRatingChanged] = useState(false);
    const [isCreatePost, setIsCreatePost] = useState(false);


    useEffect(() => {
        fetchPosts();
    }, [editingPost, isRatingChanged]);

    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:5176/api/posts", {
                method: 'GET',
                credentials: 'include'
            });

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
            const response = await fetch(`http://localhost:5176/api/posts/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log("Post deleted successfully");
            fetchPosts();
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`http://localhost:5176/api/user/logout`, {
                method: "POST",
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log("Logout successfully");
            navigate("/user/login");
        } catch (error) {
            console.error("Error Logout:", error);
        }
    }
    return (
        <div style={{width: '800px'}}>
            <div style={{textAlign: 'right', marginBottom: '2rem'}}>
                <button style={{backgroundColor: '#e53e3e', borderRadius: '10%', color: 'white'}} onClick={handleLogout}>Logout</button>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1>Discussion Board</h1>
                {!isCreatePost ? <button style={{backgroundColor: 'lightblue', borderRadius: '10%'}} onClick={() => {
                    setIsCreatePost(true);
                }}>Create Post</button> : ''}
            </div>

            {
                isCreatePost ? <CreatePost onPostCreated={fetchPosts} setIsCreatePost={setIsCreatePost} /> :
                    <div>
                        {posts.map((post) => (
                            <div key={post.id} className="post-card">
                                {editingPost === post.id ? (
                                    <EditPost post={post} onUpdate={() => { fetchPosts(); setEditingPost(null); }} onCancel={() => setEditingPost(null)} />
                                ) : (
                                    <div>
                                        <h3>{post.title}</h3>
                                        <p>{post.content}</p>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                            <strong>Tags:</strong>
                                            {post.tags.map(tag => <p style={{
                                                padding: '0.5rem',
                                                backgroundColor: 'gray',
                                                fontWeight: 700,
                                                color: 'white',
                                                borderRadius: '30%'
                                            }}>{tag.name}</p>)}
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                            <button style={{ borderRadius: '8px' }} onClick={() => setEditingPost(post.id)}>Edit</button>
                                            <button style={{ borderRadius: '8px' }} onClick={() => handleDelete(post.id)}>Delete</button>
                                        </div>

                                        <RatingPost post={post} setIsRatingChanged={setIsRatingChanged} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
            }


        </div>
    );
};


export default Discussion;