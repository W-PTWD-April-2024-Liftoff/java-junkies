import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";

export default function RegistrationForm() {
    const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifiedPassword, setVerifiedPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
      verify: verifiedPassword,
      username,
    };

    const response = await fetch('http://localhost:8080/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const createdUser = await response.json();
      const userId = createdUser.id;
      navigate(`/update-profile/${userId}`);
    } else {
      const error = await response.json();
      alert("Error " + error.error);
    }
  };

  return (
    <div>
      <h1>In the Loop</h1>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
          />

        <InputField
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <InputField
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password"
        />

        <InputField
          type='password'
          value={verifiedPassword}
          onChange={(e) => setVerifiedPassword(e.target.value)}
          placeholder="Re-enter password"
        />

        <div><Button text="Register" /></div>
      </form>
    </div>
  );
}
