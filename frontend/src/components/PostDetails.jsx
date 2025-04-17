import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PostDetails = () => {
    const [posts, setPosts] = useState([]);
    const {id} =useParams();

    useEffect(() => {
        if (id) {
            fetchPosts(id);
        }
     },[id])

    const fetchPosts = async (id) => {

        try{
            const response = await fetch(`http://localhost:5176/api/posts/${id}`, {
                method: 'GET',
                credentials: 'include'
            });
            
            if(!response.ok) {
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
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>{post.tags.map((tag) => {
                            <li key={tag.id}>
                                <p>{tag.name}</p>
                            </li>
                        })}</p>
                    </li>
                ))}
            </ul>
            </div>
        );

    
}

export default PostDetails;