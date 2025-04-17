import React, { useState } from 'react';


function Comment() {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    
    const onClickHandler = () => {
        setComments((comments) => [...comments, comment]);
    };

    const onChangeHandler = (e) => {
        setComment(e.target.value);
    };

    return(
        <div>
            {comments.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
            ))}
            <div className='comment-box'>
                <h3>Comment</h3>
                <textarea
                value={comment}
                onChange={onChangeHandler}
                className='input'
                />
                <button onClick={onClickHandler}>Submit</button>
            </div>
        </div>
    );
}

                {/* <div>{text}</div> */}

export default Comment;