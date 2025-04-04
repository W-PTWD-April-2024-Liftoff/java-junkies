// src/components/ProfileForm.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

export const ProfileForm = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
      const userId =id;
    fetch(`http://localhost:8080/user/id/${id}`)
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }
        return response.json();
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
        setError(err);
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


   fetch('http://localhost:8080/user/update-profile', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(updatedUser),
   })
     .then((res) => {
       if (!res.ok) {
         throw new Error('Failed to update user');
       }
       return res.json();
     })
     .then((data) => {
       setUser(data);
       setName(data.name);
       setEmail(data.email);
       setUsername(data.username);
       setBio(data.bio);
       alert('✅ Profile updated successfully!');
     })
     .catch((err) => {
       alert('Error: ' + err.message);
     });

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
    </div>
  );
};

export default ProfileForm;
