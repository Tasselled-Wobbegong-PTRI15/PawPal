import React, { useState, useEffect } from "react";

const Main = () => {
  // Testing to fetch request to get image 
  const [imageInfo, setImageInfo] = useState('');
  const [error, setError] = useState(null);

  // currently, GET request to `/api/image` is blocked by 'app.use(history());' in server.js, and doesn't reach to 'api/image' route. 
  // if moving 'app.use(history()) to down below api route, the request works 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/image");
        if (!response.ok) {
          console.log('response is not ok')
        }
        const result = await response.json();
        console.log('returned: ', result);
        setImageInfo(result); // Assuming the API returns an object with imageUrl
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <p>This is a main app - To be edited</p>
      <img src={imageInfo} alt="Fetched from API" />
    </>
  );
}

export default Main;