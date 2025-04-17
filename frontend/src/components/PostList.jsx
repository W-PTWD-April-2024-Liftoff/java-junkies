// import { useState, useEffect } from "react";
// import {Link} from "react-router-dom";

// const PostList = () => {
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         fetchPosts();
//      },[])

//     const fetchPosts = async () => {

//         try{
//             const response = await fetch("http://localhost:5176/api/posts");
//             if(!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();
//             setPosts(data);
//         } catch (error) {
//             console.error("Error fetching posts:", error);
//         }
//     };

//         return (

//             <div>
//                  <h1>Discussion Posts</h1>
//             <ul>
//                 {posts.map((post) => (
//                     <li key={post.id}>
//                         <h3>
//                             <Link to={`/posts/${post.id}`}>{post.title}</Link>
//                             </h3>
//                         <p>{post.content}</p>
//                         <ul>
//                         {post.tags.map((tag) => {
//                             <li key={tag.id}>
//                                 <p>{tag.name}</p>
//                             </li>
//                         })}
//                         </ul>
//                     </li>
//                 ))}
//             </ul>
//             </div>


//         );

    
// }

// export default PostList;