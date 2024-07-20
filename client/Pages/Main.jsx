import React, { useState, useEffect } from "react";
import DogCard from '../components/DogCard.jsx'
import Header from "../components/Header.jsx"
import {Link} from 'react-router-dom';

const Main = () => {
  // create a state to store a list of dogs
  const [petList, setPetList] = useState([]); // petList is an array of object
  // make a fetch request to get a list of dogs (cookie will be included in req.body)
  // loop over the returned array of dog info and store them to petList
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch('/api/allpets');
        const result = await response.json();
        console.log('result', result);
        result.forEach((ele) => {
          setPetList(result);
        });
        console.log('petList', petList);
      } catch (error) {
        console.log('error');
      }
    };
    fetchDogs();
  }, []);

  const deleteDog = async (pet_id) => {
    try {
      const response = await fetch(`/api/?pet_id=${pet_id}`, { 
        method: 'DELETE' 
      });
      if (response.ok) {
        setPetList(petList.filter(pet => pet.pet_id !== pet_id));
      } else {
        console.log('Failed to delete dog');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      <Header />
      <div className='main-container'>      
      <h2>Your dogs</h2>
      <div className='doglist-container'>
        {petList.map((currentPet) => (
          <DogCard
            key={currentPet.pet_id}
            name={currentPet.name}
            pet_id={currentPet.pet_id}
            deleteDog={deleteDog}
          />
        ))}
      </div>
      <Link to='/adddog'>
        <button className='adddog-btn'> Add Dog </button> 
      </Link>
      </div>
    </div>
  );
};

export default Main;