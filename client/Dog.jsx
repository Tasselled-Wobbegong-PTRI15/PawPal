import React, { useState, useEffect } from 'react'

const Dog = () => {
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
        

    // return dog information 
    return(
        <div>
            <p>{dogInfo.name}</p>
            <p>{dogInfo.dob}</p>
            <p>{dogInfo.age}</p>
            <p>{dogInfo.species}</p>
            <p>{dogInfo.breed}</p>    
            <p>{dogInfo.weight_lb}</p>    
            <p>{dogInfo.height_cm}</p>    
            <p>{dogInfo.color}</p>    
            <p>{dogInfo.gender}</p>    
            <p>{dogInfo.microchip}</p>    
        </div>
    )
}


export default Dog; 