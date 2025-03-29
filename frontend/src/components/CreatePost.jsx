import React, {useState, useEffect} from "react";

const CreatePost = ({onPostCreated}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {title, content}

        try {
            const response = await fetch("http://localhost:8080/posts", {
                method : "POST" ,
                headers : {
                    "Content-Type" : "application/json",
                },
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
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <form onSubmit = {handleSubmit}>
            <input type = "text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
            <button type = "submit"> Create Post</button>  
        </form>
    );
};

export default CreatePost;