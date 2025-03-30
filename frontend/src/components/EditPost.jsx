import { useState } from "react";

const EditPost = ({post, onUpdate, onCancel}) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [tags, setTags] = useState(post.tags.join(", "));

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedPost = {
            title,
            content,
            tags: tags.split(",").map(tag => tag.trim())
        };

        try {
            const response = await fetch(`http://localhost:8080/posts/${post.id}`, {
                method : "PUT",
                headers : { "Content-Type": "application/json" },
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
        <form onSubmit={handleUpdate} className="edit-post-form">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma-separated)" />
            <button type="submit">Update Post</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditPost;