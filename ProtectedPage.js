// src/ProtectedPage.js
import React, { useEffect, useState } from 'react';

const ProtectedPage = ({ token, onLogout }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data using the token
    const fetchData = async () => {
      try {
        const response = await fetch('your_api_endpoint', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Protected Page</h2>
      <button onClick={onLogout}>Logout</button>

      {data ? (
        <div>
          <h3>Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ProtectedPage;

