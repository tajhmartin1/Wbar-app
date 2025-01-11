// src/components/SpinitronData.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SpinitronData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://spinitron.com/api/spins', {
          headers: {
            'Authorization': `Bearer Rw9eOWennZA198iWYxM2vem2`
          }
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div>
      <h1>Spinitron Data</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li> // Adjust according to the data structure
        ))}
      </ul>
    </div>
  );
};

export default SpinitronData;
