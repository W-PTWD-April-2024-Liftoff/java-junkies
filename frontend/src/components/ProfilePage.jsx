import React, { useState, useEffect } from 'react';
import '../App.css'

  export const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');


    useEffect(() => {
      fetch('http://localhost:8080/user/profile')
        .then(async (response) => {
          if (!response.ok) {
               const text = await response.text();
                  throw new Error(text);
          }
          return response.json();
        })
        .then(data => {
          setUser(data);
          setName(data.name || '');
          setEmail(data.email || '');
          setUsername(data.username || '');
          setBio(data.bio || '');
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUser = {
            id: user.id,
            name,
            email,
            username,
            bio
            };

        fetch('http://localhost:8080/user/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(updatedUser),
            })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update profile');
                }
            return response.text();
            })
        .then(msg => {
            alert(msg);
            })
        .catch(err => {
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
        <label>Name:
            <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            </label>

       <label>Email:
           <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            </label>

           <label>Username:
               <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                </label>

                   <label>Biography:
                       <input
                        type='text'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        />
                        </label>

                        <button type='submit'>Save</button>

                        </form>
                        </div>
  );

};

export default ProfilePage;