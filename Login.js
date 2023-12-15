import React, { useState } from 'react';
import { loginUser } from './api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Register from './Register';
import Image from './Image';
import './App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook

  

  const handleLogin = async () => {
    try {
      const response = await loginUser({ username, password });
      console.log('Login successful:', response);

      const token = response.token; // Adjust according to your API response

      if (token) {
        // If registration is successful and you have a token, navigate to the Image page
        navigate('/image', { state: { token } });
      }


    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const handleRegister = async () => {
    try {
      console.log('register button works:');
      navigate('/register'); // Use navigate function
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };
  return (
    <div>
      <h2>Login</h2>
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
     
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Login;