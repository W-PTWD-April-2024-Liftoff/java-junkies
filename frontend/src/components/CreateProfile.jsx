import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PhotoUploader from './PhotoUploader';

const UpdateProfilePage = () => {
  const { id } = useParams(); // Comes from the route /update-profile/:id
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5176/api/user/details/${id}`)
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        return JSON.parse(text);
      })
      .then((data) => {
        setUser(data);
        setName(data.name || '');
        setEmail(data.email || '');
        setUsername(data.username || '');
        setBio(data.bio || '');
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading user:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      id: user.id,
      name,
      email,
      username,
      bio,
    };

    try {
      const response = await fetch(`http://localhost:5176/api/user/update-profile/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Update failed");

      const updated = await response.json();
      alert("Profile updated successfully!");
      setUser(updated);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleGoToPosts = () => {
    navigate('/user/login');
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>Update Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <PhotoUploader userId={user.id} />

          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /><br /><br />

          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br /><br />

          <label>Username:</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br /><br />

          <label>Bio:</label><br />
          <textarea
            rows="4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          /><br /><br />

          <button type="submit" style={{ marginRight: '10px' }}>Save</button>
          <button type="button" onClick={handleGoToPosts}>Login</button>
        </form>
      </div>

  );
};

export default UpdateProfilePage;
