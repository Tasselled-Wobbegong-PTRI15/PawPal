import React, { useState, useEffect } from "react";
import DogCard from '../components/DogCard.jsx'
import Header from "../components/Header.jsx"
import { Link } from 'react-router-dom'

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
        })
        console.log('petList', petList)
      } catch (error) {
        console.log('error')
      }
    }
    fetchDogs();
  }, []);

  const pets = [];
  // loop over petList and create 'DogCard' component 
  for (let i = 0; i < petList.length; i++) {
    // render DogCard for each state 
    const currentPet = petList[i];
    pets.push(<DogCard 
      name = {currentPet.name}
      pet_id = {currentPet.pet_id}
      // add more props
    />)
  }
  
  return (
    <div>
      <Header />
      <h4>Your dogs</h4>
      <div>
        {pets}
      </div>
      <Link to='/adddog'>
        <button>test</button>
      </Link>
    </div>
  );
}

export default Main;