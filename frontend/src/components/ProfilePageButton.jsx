import React from "react";
import { Link } from 'react-router-dom';

function ProfilePageButton() {
  const userId = localStorage.getItem('userId');

  if (!userId) return null; // Don't show button if no user ID

  return (
    <div>
      <Link to={`/profile/${userId}`}>
        <button style={{ backgroundColor: 'lightblue', borderRadius: '10%' }}>
          Go to Profile
        </button>
      </Link>
    </div>
  );
}

export default ProfilePageButton;
