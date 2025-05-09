import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";
import Layout from "./Layout";

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    verifiedPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.verifiedPassword) {
      alert('Passwords must match.');
      return;
    }

    const newUser = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      verify: formData.verifiedPassword,
    };

    try {
      const response = await fetch('http://localhost:5176/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const createdUser = await response.json();


        localStorage.setItem("userId", createdUser.id);

        alert(`${formData.email} was registered successfully!`);
        navigate(`/update-profile/${createdUser.id}`);
      } else {
        const error = await response.json();
        alert("Error: " + error.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Try again.');
    }
  };

  return (

      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
        <h1>In the Loop</h1>
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>

          <InputField
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <InputField
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
          />

          <InputField
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter a password"
          />

          <InputField
            type='password'
            name='verifiedPassword'
            value={formData.verifiedPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
          />

          <div style={{ marginTop: '1rem' }}>
            <Button text="Register" type="submit" />
          </div>
        </form>
      </div>

  );
}
