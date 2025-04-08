import { useState, useEffect } from "react";

const PostList = ({ posts, onTagClick}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
     },[])

    const fetchPosts = async () => {

        try{
            const response = await fetch("http://localhost:8080/posts");
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

        //return (
        //     <div>
        //          <h1>Discussion Posts</h1>
        //     <ul>
        //         {posts.map((post) => (
        //             <li key={post.id}>
        //                 <h3>{post.title}</h3>
        //                 <p>{post.content}</p>
        //                 <p>{post.tags.map((tag) => {
        //                     <li key={tag.id}>
        //                         <p>{tag.name}</p>
        //                     </li>
        //                 })}</p>
        //             </li>
        //         ))}
        //     </ul>
        //     </div>
        // );

        return (
            <div>
              {posts.map(post => (
                <div className="forum-post" key={post.id}>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  <div className="tags">
                    {post.tags.map(tag => (
                      <span className="tag" key={tag} onClick={() => onTagClick(tag)}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
}

export default PostList;