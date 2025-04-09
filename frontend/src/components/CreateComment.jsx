import React, { useState } from "react";

const CreateComment = ({onCommentCreated}) => {
    const [text, setText] = useState("");
    const [createdAt, setCreatedAt] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentData = {
            text,
            createdAt
        };

     try{
        const response = await fetch("http://localhost8080/comments", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(commentData)
        });
        
     if(!response.ok) {
        throw new Error('HTTP error! Status: ${response.status}');
     }
     
     const data = await response.json();
     console.log("comment created:", data);
     onCommentCreated();
     setText("");
     setCreatedAt("");
     } catch (error) {
        console.error("Error creating comment:", error);
     }
    };

    return (
        <form>
        <input type="text" placeholder="Add a comment..." value={text} onChange={(e) => setText(e.target.value)} required/>        <textarea placeholder="Add a comment..." value={text} onChange={(e) => setText(e.target.value)} required/>
        <button type="submit">Create Comment</button>
        </form>
    );

};

export default CreateComment;