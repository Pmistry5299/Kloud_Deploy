// src/api.js
const BASE_URL = 'http://10.173.39.250:8000';

export const registerUser = async (userData) => {
  const url = `${BASE_URL}/user/register/`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Registration error: ${error.message}`);
  }
};

export const loginUser = async (credentials) => {
  const url = `${BASE_URL}/user/login/`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    throw new Error(`Login error: ${error.message}`);
  }
};
