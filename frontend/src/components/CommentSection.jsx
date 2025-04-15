import React, { useEffect, useState } from 'react';

function CommentSection ({ post }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState ("");

    useEffect(() => {
        fetchComments(); 
    }, []);

const fetchComments = async () => {
    try {
        const response = await fetch(`http://localhost:8080/comments/${post.id}`);
        const data = await response.json();
        setComments(data);
    } catch (error) {
        console.error("Error fetching comments:", error);
    }
};

const handleCommentChange = (e) => {
    setNewComment(e.target.value);
};

const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`http://localhost:8080/comments`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },

        body: JSON.stringify({ text: newComment}),
    });

    if (response.ok) {
        fetchComments();
        setNewComment("");
    } else {
        console.error("failed to add comment");
    }

    } catch(error) {
        console.error("Error adding comment:", error)
    }
};

return (
    <div>
        <h3>Comments</h3>
        <ul>
            {comments.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
            ))}
        </ul>

        <form onSubmit={handleCommentSubmit}>
        <textarea
        value={newComment}
        onChange={handleCommentChange}
        placeholder='Add a comment...'
        />
        <button type='submit'>Comment</button>
        </form>
    </div>
);

}

export default CommentSection;