import React, { useState } from 'react';

const Main = () => {

    const [dogInfo, setDogInfo] = useState ({
        name: '',
        breed: '',
        DOB: '',
        gender: '',
        microchip:'',
        weight: '',
        
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(dogInfo);
        setDogInfo({...dogInfo, [e.target.name]: e.target.value})
        console.log(e.target)
    }

    const handleAddDog = () => {
        // Logic for adding a dog (e.g., sending data to a backend)
        console.log('Dog information added:', dogInfo);
    };

    return (
        <div>
            <input 
                name="name" 
                placeholder="Name" 
                value={dogInfo.name} 
                onChange={handleChange}/>
            <input name="breed" 
                placeholder="Breed" 
                value={dogInfo.breed} 
                onChange={handleChange}/>
            <input 
                name="DOB" 
                placeholder="Age" 
                value={dogInfo.DOB} 
                onChange={handleChange}/>
            <input 
                name="gender" 
                placeholder="Gender" 
                value={dogInfo.gender} 
                onChange={handleChange} />
            <input 
                name="microchip" 
                placeholder="Microchip Number" 
                value={dogInfo.microchip} 
                onChange={handleChange}/>
            <input 
                name="weight" 
                placeholder="Weight"
                value={dogInfo.weight} 
                onChange={handleChange}/>
            <button onClick={handleAddDog}>Add Dog</button>
        </div>
    )

}

export default Main;