import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import { buildAuthHeader } from "../utils/buildAuthHeader";
import { useAuth0 } from "@auth0/auth0-react";

const CreatePost = ({onPostCreated, setIsCreatePost}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState ("");
    const { getAccessTokenSilently } = useAuth0();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tagsObjectArray = tags.split(",").map(tag => ({name: tag.trim()}))
        const postData = {
            title, 
            content,
            tags: tagsObjectArray
         };

        try {
            const headers = await buildAuthHeader({getAccessTokenSilently})
            const response = await fetch("http://localhost:5176/api/posts", {
                method : "POST" ,
                credentials: 'include',
                headers,
                body : JSON.stringify(postData)
            });

            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("post created:", data);
            onPostCreated();
            setTitle("");
            setContent("");
            setTags("");
            setIsCreatePost(false);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (


        <form className="post-form" onSubmit = {handleSubmit}>
            <input type = "text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
            <input type="text" placeholder="Tags (coma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} /> 
            <button type = "submit"> Create Post</button>  
        </form>


    );
};

export default CreatePost;