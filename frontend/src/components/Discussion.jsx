import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import RatingPost from "./RatingPost";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Discussion = () => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [isRatingChanged, setIsRatingChanged] = useState(false);
    const [isCreatePost, setIsCreatePost] = useState(false);
    const { getAccessTokenSilently } = useAuth0();


    useEffect(() => {
        fetchPosts();
    }, [editingPost, isRatingChanged]);

    const fetchPosts = async () => {
        try {

            const passwordLogin = localStorage.getItem('passwordLogin') === 'true';
        let headers = {
            'Content-Type': 'application/json'
        };

        if(!passwordLogin) {
            const JWTtoken = await getAccessTokenSilently({
                audience: "https://intheloop-auth0api.com",
                scope: "read:posts"
            });
            headers.Authorization = `Bearer ${JWTtoken}`;
        }

            const response = await fetch("http://localhost:5176/api/posts", {
                method: 'GET',
                credentials: 'include',
                headers
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

            const token = await getAccessTokenSilently({
                audience: "http://localhost:5176",
                scope: "delete:posts"
            });

            const response = await fetch(`http://localhost:5176/api/posts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${JWTtoken}`,
                    'Content-Type': 'application/json'
                }
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
    return (
        <div style={{width: '800px'}}>
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