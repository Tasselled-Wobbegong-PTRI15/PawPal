import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const DogCard = (props) => {
  const { name, pet_id, deleteDog } = props;

  const [dogImage, setDogImage] = useState('');

  // get dog image 
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/image?pet_id=${pet_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        const result = await response.json();
        setDogImage(result); // Assuming the API returns an object with imageUrl
      } catch (error) {
        console.log('Fetch error');
      }
    };
    fetchImage();
  }, []);

  return (
    <div className='dog-card'>
      <img className='dog-image' src={dogImage} alt={`${name}`}/>
      <h4>{name}</h4>
      <div className='dog-card-btn-wrapper'>
        <Link to={`/dog?pet_id=${pet_id}`}>
          <button className='dog-card-btn'>See more</button>
        </Link>
        <button className='dog-card-btn' onClick={() => deleteDog(pet_id)}>Delete</button>
      </div>
    </div>
  )
}

export default DogCard;