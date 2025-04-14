import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profile_Page from './Profile_Page';
import Discussion from './Discussion';


function ProfilePageButton() {
  return (
    <div>
      <Link to="/{id}/profile">
        <button>Go to Profile</button>
      </Link>
    </div>
  );
}


 export default ProfilePageButton;