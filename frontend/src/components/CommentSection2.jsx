import { useState, useEffect } from "react";

const CommentSection2 = ({onCommentCreated, setIsComment}) => {
    const [text, setText] = useState("")



    const handleComment = async (e) => {
        e.preventDefault();

        const commentData = {
            text
        }

        try {
            const response = await fetch("http://localhost:5176/api/posts/comments", {
                method : "POST" ,
                credentials: 'include',
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(commentData)
            });


            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("comment created:", data);
            onCommentCreated();
            setText("")
            setIsComment(true)
        } catch (error){
            console.error("Error adding comment:", error);
        } 
    }

    return (
        <div>
            <h3>Comments</h3>
            {/* <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.text}</li>
                ))}
            </ul> */}
    
            <form onSubmit={handleComment}>
            <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Add a comment...'
            />
            <button type='submit'>Comment</button>
            </form>
        </div>
    );

};

export default CommentSection2;

