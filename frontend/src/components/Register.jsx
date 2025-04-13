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
    };

    const newUser = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      verify: formData.verifiedPassword
    };

    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const createdUser = await response.json();
        alert(`${formData.email} was registered successfully!`);
        navigate(`/update-profile/${createdUser.id}`);
      } else {
        const error = await response.json();
        alert("Error " + error.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Try again.')
    };
  };

  return (
      <Layout>
    <div>
      <h1>In the Loop</h1>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <InputField
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email">
          </InputField>
        </div>

        <div>
          <InputField
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter a username">
          </InputField>
        </div>

        <div>
          <InputField
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter a password">
          </InputField>
        </div>

        <div>
          <InputField
            type='password'
            name='verifiedPassword'
            value={formData.verifiedPassword}
            onChange={handleChange}
            placeholder="Re-enter password">
          </InputField>
        </div>

        <div>
          <Button
            text="Register"
            type="submit"
          />
        </div>
      </form>
    </div>
    </Layout>
  );
};

