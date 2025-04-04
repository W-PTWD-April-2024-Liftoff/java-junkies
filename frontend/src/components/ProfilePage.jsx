// src/components/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

export const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');


useEffect(() => {
  const newUser = {
    id: null,
    name: name || "Your Name",
    email: email || "your@email.com",
    username: username || "yourUsername",
    bio: bio || "This is my bio"
  };

  fetch('http://localhost:8080/user/update-profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to create or update user');
      }
      return res.json();
    })
    .then((data) => {
      setUser(data);
      setName(data.name || '');
      setEmail(data.email || '');
      setUsername(data.username || '');
      setBio(data.bio || '');
      console.log("✅ User created or loaded:", data);

      setLoading(false);
    })
    .catch((err) => {
      console.error("❌ Error:", err.message);
      setError(err);
      setLoading(false);
    });
}, []);


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
    const response = await fetch('http://localhost:8080/user/update-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    const data = await response.json();
    setUser(data);
    setName(data.name);
    setEmail(data.email);
    setUsername(data.username);
    setBio(data.bio);
    alert('✅ Profile updated successfully!');
  } catch (err) {
    alert('Error: ' + err.message);
  }
};



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  return (
    <div>
      <h1>In The Loop</h1>
      <h2>User Profile</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />

        <label>
          Email:
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />

        <label>
          Username:
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />

        <label>
          Biography:
          <input type='text' value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <br />

        <button type='submit'>Save</button>
      </form>


      <div style={{ marginTop: '2rem', backgroundColor: '#f9f9f9', padding: '1rem' }}>
        <h4>Live Preview (Debug):</h4>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ProfilePage;
