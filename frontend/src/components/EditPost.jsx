import { useState } from "react";
import Layout from "./Layout";
import { useAuth0 } from "@auth0/auth0-react";
import { buildAuthHeader } from "../utils/buildAuthHeader";

const EditPost = ({post, onUpdate, onCancel}) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [tags, setTags] = useState(post.tags);
    const {getAccessTokenSilently} = useAuth0();

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedPost = {
            title,
            content,
            tags: tags
        };
        const headers = await buildAuthHeader({getAccessTokenSilently})

        try {
            const response = await fetch(`http://localhost:5176/api/posts/${post.id}`, {
                method : "PUT",
                headers,
                body : JSON.stringify(updatedPost)
            });

            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("post updated:", data);
            onUpdate();
        } catch (error){
            console.error("Error updating post:", error);
        }  
    };
    return (
        <Layout>

        <form onSubmit={handleUpdate} className="edit-post-form">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
            <input type="text" value={tags.map(tag => tag.name).join(",")} onChange={(e) => {
                const tagValues = e.target.value.split(",")
                const updatedTags = tagValues.map(value => ({name: value}))
                setTags(updatedTags)
            }} placeholder="Tags (comma-separated)" />
            <button type="submit">Update Post</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
        </Layout>

    );
};

export default EditPost;