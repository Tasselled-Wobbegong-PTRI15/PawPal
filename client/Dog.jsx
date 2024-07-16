import React, { useState, useEffect } from 'react'

const Dog = props => {
    // create a state
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
    })

    console.log('state is', dogInfo);

    // make a fetch request to /api, and store response to state 
    useEffect(() => {
        const displayDogInfo = async (e) => {
            console.log('displayDogInfo is running')
            try{
                const response = await fetch('/api')
                const result = await response.json()
                console.log('result', result);
                setDogInfo({
                    ...dogInfo,
                    name: result.name,
                    dob: result.dob,
                    age: result.age,
                    species: result.species,
                    breed: result.breed, 
                    weight_lb: result.weight_lb,
                    height_cm: result.height_cm,
                    color: result.color,
                    gender:result.gender, 
                    microchip: result.microchip, 
                    
                })
            } catch (error) {
                console.log('error happend in fetch request') 
            }

        }
        displayDogInfo();
    }, [])
        
    const handleEditClick = () => {
        // edit logic goes here, redirect to separate page to edit dog info? 
    }
    // return dog information 
    return(
        <div>
            <p>
                <label htmlFor ='name'>Name: </label>
                <span id= "dogName">{dogInfo.name} </span>
            </p>
            <p>
                <label htmlFor ='species'>Species: </label>
                <span id= "species">{dogInfo.species} </span>
            </p>
            <p>
                <label htmlFor ='breed'>Breed: </label>
                <span id= "breed">{dogInfo.breed} </span>
            </p>      
            <p>
                <label htmlFor ='dob'>Date of Birth: </label>
                <span id= "dob">{dogInfo.dob} </span>
            </p>
            <p>
                <label htmlFor ='weight_lb'>Weight(lbs): </label>
                <span id= "weight_lb">{dogInfo.weight_lb} </span>
            </p>
            <p>
                <label htmlFor ='height_cm'>Height(cm): </label>
                <span id= "height_cm">{dogInfo.height_cm} </span>
            </p>    
            <p>
                <label htmlFor ='color'>Color: </label>
                <span id= "color">{dogInfo.color} </span>
            </p>    
            <p>
                <label htmlFor ='gender'>Gender: </label>
                <span id= "gender">{dogInfo.gender} </span>
            </p>    
            <p>
                <label htmlFor ='microchip'>Microchip number: </label>
                <span id= "microchip">{dogInfo.microchip} </span>
            </p>
            <button onClick ={handleEditClick}>Edit</button>    
        </div>
    )
}


export default Dog; 

