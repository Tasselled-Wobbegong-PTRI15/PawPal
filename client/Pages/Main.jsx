import React, { useState } from 'react';

const Main = () => {
  const [dogInfo, setDogInfo] = useState({
    name: '',
    dob: '',
    age: '',
    species:'',
    breed: '',
    weight_lb: '',
    height_cm: '',
    color:'',
    gender: '',
    microchip: '',
  });

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // console.log(dogInfo);
    setDogInfo({ ...dogInfo, [e.target.name]: e.target.value });
    // console.log(e.target);
  };

  const handleAddDog = async (e) => {
    // Logic for adding a dog (e.g., sending data to a backend)
    console.log('Dog information added:', dogInfo);
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dogInfo),
      });

      if (response.ok) {
        // TODO: update setDogInfo 
        setDogInfo({
          ...dogInfo,
          name: '',
            dob: '',
            age: '',
            species:'',
            breed: '',
            weight_lb: '',
            height_cm: '',
            color:'',
            gender: '',
            microchip: '',
        });
      } else {
        console.log('failed to save resource');
      }
    } catch (error) {
      console.log('error occured');
    }
  };

  // TODO: add input tags 
  return (
    <div>
      <input
        name='name'
        placeholder='Name'
        value={dogInfo.name}
        onChange={handleChange}
      />
      <input
        name='breed'
        placeholder='Breed'
        value={dogInfo.breed}
        onChange={handleChange}
      />
      <input
        name='dob'
        placeholder='Date of Birth'
        value={dogInfo.dob}
        onChange={handleChange}
      />
        <input
        name='age'
        placeholder='Age'
        value={dogInfo.age}
        onChange={handleChange}
      />
      <input
        name='gender'
        placeholder='Gender'
        value={dogInfo.gender}
        onChange={handleChange}
      />
      <input
        name='species'
        placeholder='Species'
        value={dogInfo.species}
        onChange={handleChange}
      />
      <input
        name='microchip'
        placeholder='Microchip Number'
        value={dogInfo.microchip}
        onChange={handleChange}
      />
      <input
        name='weight_lb'
        placeholder='Weight'
        value={dogInfo.weight_lb}
        onChange={handleChange}
      />
       <input
        name='height_cm'
        placeholder='Height'
        value={dogInfo.height_cm}
        onChange={handleChange}
      />
      <input
        name='color'
        placeholder='Color'
        value={dogInfo.color}
        onChange={handleChange}
      />
      <button onClick={handleAddDog}>Add Dog</button>
    </div>
  );
};

export default Main;
