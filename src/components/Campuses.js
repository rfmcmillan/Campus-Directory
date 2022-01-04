import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Campuses = () => {
  const [campuses, setCampuses] = useState([]);

  useEffect(async () => {
    const response = await axios.get('/api/campuses');
    setCampuses(response.data);
  }, []);

  return (
    <div>
      <h1>Campuses</h1>
      {campuses.map((campus) => {
        return (
          <div>
            <img src={campus.imageUrl} width="200px" />
            <p>{campus.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Campuses;
