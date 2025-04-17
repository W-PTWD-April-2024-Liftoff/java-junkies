import { useState, useEffect } from "react";
import Layout from "./Layout";
import { useAuth0 } from "@auth0/auth0-react";
import { buildAuthHeader } from "../utils/buildAuthHeader";


const RatingPost = (params) => {
    const {post, setIsRatingChanged} = params || {};
    const [rating, setRating] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const ratingMap = {
        5: "Excellent",
        4: "Very Good",
        3: "Good",
        2: "Fair",
        1: "Poor"
    }
    const handleRate = async () => {
        const headers = await buildAuthHeader({getAccessTokenSilently})
        try {
            const response = await fetch(`http://localhost:5176/api/posts/${post.id}/rate`, {
                method : "PUT",
                headers,
                body : JSON.stringify({rating})
            });

            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("post updated:", data);
            setIsRatingChanged(true)
        } catch (error){
            console.error("Error updating post:", error);
        } 
    }

    const displayRatings = () => {
        const summRatings = post.ratings.reduce((accm, curr) => {
            if (accm[curr.rating]) {
                accm[curr.rating] = accm[curr.rating] + 1
            } else {
                accm[curr.rating] = 1
            }
            return accm;
        }, {})
        return <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            {
                Object.keys(summRatings).sort().map(key => {
                    return <p><b>{ratingMap[key]}: </b>{summRatings[key]}</p>
                })
            }
        </div>
    }

    return (

        <div className="rating-section">
            <select id="rating" name="rating" onChange={(event) => {
                console.log(event.target.value)
                setRating(parseInt(event.target.value))
                setIsRatingChanged(false)
            }}>
                <option value="">--Select rating--</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
            </select>
            <button onClick={handleRate}>Submit</button>
            {
                displayRatings()
            }
        </div>

    )
}

export default RatingPost;