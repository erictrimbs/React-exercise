import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MostRecentImage: React.FC = () => {
  const [mostRecentUrl, setMostRecentUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchMostRecent = async () => {
      try {
        const response = await axios.get('http://localhost:3001/most-recent');
        setMostRecentUrl(response.data.url);
      } catch (error) {
        console.error('Error fetching the most recent object:', error);
      }
    };

    fetchMostRecent();
  }, []);

  return (
    <div>
      <h2>Most Recent Image</h2>
      {mostRecentUrl ? (
        <a href={mostRecentUrl}>
          <img src={mostRecentUrl} alt="Most Recent" style={{ maxWidth: '300px', maxHeight: '300px' }} />
        </a>
      ) : (
        <p>No recent image found</p>
      )}
    </div>
  );
};

export default MostRecentImage;
