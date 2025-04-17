import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5176/api/user/profile/${id}`)
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
        console.error("Error fetching user:", err.message);
        setLoading(false);
      });
  }, [id]);

  const handleGoToUpdate = () => {
    navigate(`/update-profile/${id}`);
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found</p>;

  return (

      <div style={styles.container}>
        <h2 style={styles.title}> Profile</h2>
     <img
       src={
         user.profilePictureUpload
           ? `http://localhost:5176/uploads/images/${user.profilePictureUpload}`
           : '/default-avatar.png'
       }
       alt="Profile"
       style={styles.image}
     />

        <div style={styles.info}>
          <p><strong>Name:</strong> {user.name || 'N/A'}</p>
          <p><strong>Username:</strong> {user.username || 'N/A'}</p>
          <p><strong>Email:</strong> {user.email || 'N/A'}</p>
          <p><strong>Bio:</strong> {user.bio || 'No bio added yet.'}</p>
        </div>
        <button
          type="button"
          onClick={handleGoToUpdate}
          style={styles.button}
        >
          Update Profile
        </button>
      </div>

  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: 'auto',
    textAlign: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  image: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem'
  },
  info: {
    textAlign: 'left',
    marginTop: '1rem',
    lineHeight: '1.6',
    fontSize: '1rem'
  },
  button: {
    marginTop: '1.5rem',
    padding: '10px 20px',
    backgroundColor: '#4e9af1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default ProfilePage;
