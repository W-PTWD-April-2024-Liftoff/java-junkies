import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PhotoUploader from './PhotoUploader';

const UpdateProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/details/${id}`)
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
        setError(err.message);
        setLoading(false);
      });
  }, [id]);


  const handleClick = () => {
    navigate('/user/login');
  };


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
      const response = await fetch(`http://localhost:8080/api/user/update-profile/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Update failed");

      const updated = await response.json();
      alert("Profile updated!");
      setUser(updated);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
          <PhotoUploader userId={user.id} />
        <label>Name:</label><br />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />

        <label>Email:</label><br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />

        <label>Username:</label><br />
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />

        <label>Bio:</label><br />
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} /><br /><br />

        <button type="submit">Save
        </button>
        <button type="button" onClick={handleClick}>Main Page</button>

      </form>
    </div>
  );
};

export default UpdateProfilePage;
