import { useState, useEffect } from "react";
import Layout from "./Layout";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
     },[])

    const fetchPosts = async () => {

        try{
            const response = await fetch("http://localhost:5176/api/posts");
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
            <Layout>
            <div>
                 <h1>Discussion Posts</h1>
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
            </Layout>

        );

    
}

export default PostList;