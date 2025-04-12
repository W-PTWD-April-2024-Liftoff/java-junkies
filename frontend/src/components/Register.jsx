import React, { use, useState } from "react";
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

   if (password !== verifiedPassword) {
      alert("Passwords must match.");
      return;
    }

    const newUser = {
        username,
        email,
      password,
      verify: verifiedPassword,
    };

    const response = await fetch('http://localhost:8080/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

const text = await response.text();
let createdUser = null;

try {
  if (text) {
    createdUser = JSON.parse(text);
  }
} catch (err) {
  console.warn("Could not parse response as JSON:", err);
}


   if (response.ok) {
     if (createdUser && createdUser.id) {
       alert(`${email} was registered successfully!`);
       navigate(`/update-profile/${createdUser.id}`);
     } else {
       alert("Registered, but no user ID returned.");
     }
   } else {
     alert("Registration failed: " + text);
   }

  };

  return (
    <div>
      <h1>In the Loop</h1>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
           <InputField
                    type='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Create Username"
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
  )
  };