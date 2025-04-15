import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
// import './Profile_Page.css';
import PhotoUploader from './PhotoUploader';


function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      console.log("🔎 ID param:", id);
    fetch(`http://localhost:8080/user/${id}/profile`)
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        return JSON.parse(text);
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading user:", err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <Layout>
      <div className='upc'>
        <div className="gradiant"></div>
        <div className="profile-down">
      <img
        src={
          user.profilePictureUpload
            ? `/uploads/images/${user.profilePictureUpload}`
            : '/default-avatar.png'
        }
        alt="Profile"
        className="profile-img"
      />

          <PhotoUploader userId={user.id} />
          <div className="profile-title">{user.name}</div>
          <div className="profile-description">{user.bio}</div>
          <div className="profile-button">
            <a href={`mailto:${user.email}`}>Contact me</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
