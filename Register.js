// Register.js
import React, { useState } from 'react';
import { registerUser } from './api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './App.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userData = { username, password, email };
      const response = await registerUser(userData);
      console.log('Registration successful:', response);

      // Assuming your response includes a token, you might want to check the structure
      const token = response.token; // Adjust according to your API response

      if (token) {
        // If registration is successful and you have a token, navigate to the Image page
        navigate('/image', { state: { token } });
      }
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      console.log('register button works:');
      navigate('/login'); // Use navigate function
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button> 
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Register;
