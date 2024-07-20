import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "../Navigation.jsx"; 
import Header from "../components/Header.jsx"

const Dog = () => {
  // access query parameter 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pet_id = queryParams.get('pet_id');

  const [dogInfo, setDogInfo] = useState({
    name: "",
    dob: "",
    age: "",
    species: "",
    breed: "",
    weight_lb: "",
    height_cm: "",
    color: "",
    gender: "",
    microchip: "",
  });

  // store pet_id in state
  const [petId, setPetId] = useState(pet_id);
  const [isEditing, setIsEditing] = useState(false);

  // store dog image 

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

  useEffect(() => {
    const displayDogInfo = async () => {
      console.log("displayDogInfo is running");
      try {
        const response = await fetch(`/api?pet_id=${petId}`);
        const result = await response.json();
        setDogInfo(result);
      } catch (error) {
        console.log("error happened in fetch request");
      }
    };
    displayDogInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDogInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // save click will send patch request to update dog info in db
  const handleSaveClick = async () => {
    try {
      const response = await fetch("/api", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dogInfo),
      });

      if (response.ok) {
        const result = await response.json();
        setDogInfo({
          ...dogInfo,
          result,
        });
        setIsEditing(false);
      } else {
        console.log("Failed to update dog info");
      }
    } catch (error) {
      console.log("Error happened in PATCH request", error);
    }
  };

  // edit click
  const handleEditClick = () => {
    setIsEditing(true);
  };
  // cancel click
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  // function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <Header />
      <div>
        <Navigation pet_id={pet_id} />
        <div className="dog-container">
        <div className="dog-profile-left">
          <h4>{dogInfo.name}</h4>
          <img className='dog-image' src={dogImage} alt={`${dogInfo.name}`}/>
        </div>
        
          {isEditing ? (
            <div className="dog-profile-list">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={dogInfo.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="species">Species:</label>
                <input
                  type="text"
                  id="species"
                  name="species"
                  value={dogInfo.species}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="breed">Breed:</label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={dogInfo.breed}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="text"
                  id="dob"
                  name="dob"
                  value={formatDate(dogInfo.dob)}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight_lb">Weight (lbs):</label>
                <input
                  type="text"
                  id="weight_lb"
                  name="weight_lb"
                  value={dogInfo.weight_lb}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="height_cm">Height (cm):</label>
                <input
                  type="text"
                  id="height_cm"
                  name="height_cm"
                  value={dogInfo.height_cm}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="color">Color:</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={dogInfo.color}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={dogInfo.gender}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="microchip">Microchip number:</label>
                <input
                  type="text"
                  id="microchip"
                  name="microchip"
                  value={dogInfo.microchip}
                  onChange={handleChange}
                />
              </div>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          ) : (
            <div className="dog-profile-list">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <span id="dogName">{dogInfo.name}</span>
              </div>
              <div className="form-group">
                <label htmlFor="species">Species:</label>
                <span id="species">{dogInfo.species}</span>
              </div>
              <div className="form-group">
                <label htmlFor="breed">Breed:</label>
                <span id="breed">{dogInfo.breed}</span>
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <span id="dob">{formatDate(dogInfo.dob)}</span>
              </div>
              <div className="form-group">
                <label htmlFor="weight_lb">Weight (lbs):</label>
                <span id="weight_lb">{dogInfo.weight_lb}</span>
              </div>
              <div className="form-group">
                <label htmlFor="height_cm">Height (cm):</label>
                <span id="height_cm">{dogInfo.height_cm}</span>
              </div>
              <div className="form-group">
                <label htmlFor="color">Color:</label>
                <span id="color">{dogInfo.color}</span>
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <span id="gender">{dogInfo.gender}</span>
              </div>
              <div className="form-group">
                <label htmlFor="microchip">Microchip number:</label>
                <span id="microchip">{dogInfo.microchip}</span>
              </div>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dog;

/* save original 

 return (
    <div>
      <Header />
      <div>
        <Navigation pet_id={pet_id} />
        <div className='dog-container'>
          {isEditing ? (
            <div className='dog-profile-list'>
              <p>
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={dogInfo.name}
                  onChange={handleChange}
                />
              </p>
              <p>
                <label htmlFor="species">Species: </label>
                <input
                  type="text"
                  id="species"
                  name="species"
                  value={dogInfo.species}
                  onChange={handleChange}
                />
              </p>
              <p>
                <label htmlFor="breed">Breed: </label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={dogInfo.breed}
                  onChange={handleChange}
                />
              </p>
              <p>
                <label htmlFor="dob">Date of Birth: </label>
                <input
                  type="text"
                  id="dob"
                  name="dob"
                  value={dogInfo.dob}
                  onChange={handleChange}
                />
              </p>
              <p>
                <label htmlFor="weight_lb">Weight(lbs): </label>
                <input
                  type="text"
                  id="weight_lb"
                  name="weight_lb"
                  value={dogInfo.weight_lb}
                  onChange={handleChange}
                />
              </p>
              <p>
                <label htmlFor="height_cm">Height(cm): </label>
                <input
                  type="text"
                  id="height_cm"
                  name="height_cm"
                  value={dogInfo.height_cm}
                  onChange={handleChange}
                />
              </p>
              <p>
                <label htmlFor="color">Color: </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={dogInfo.color}
                  onChange={handleChange}
                />
              </p>
              <p>
                <label htmlFor="gender">Gender: </label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={dogInfo.gender}
                  onChange={handleChange}
                />
              </p>
              <p>
                <label htmlFor="microchip">Microchip number: </label>
                <input
                  type="text"
                  id="microchip"
                  name="microchip"
                  value={dogInfo.microchip}
                  onChange={handleChange}
                />
              </p>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div> 
          ) : (
            <div className='dog-profile-list'>
              <p>
                <label htmlFor="name">Name: </label>
                <span id="dogName">{dogInfo.name} </span>
              </p>
              <p>
                <label htmlFor="species">Species: </label>
                <span id="species">{dogInfo.species} </span>
              </p>
              <p>
                <label htmlFor="breed">Breed: </label>
                <span id="breed">{dogInfo.breed} </span>
              </p>
              <p>
                <label htmlFor="dob">Date of Birth: </label>
                <span id="dob">{dogInfo.dob} </span>
              </p>
              <p>
                <label htmlFor="weight_lb">Weight(lbs): </label>
                <span id="weight_lb">{dogInfo.weight_lb} </span>
              </p>
              <p>
                <label htmlFor="height_cm">Height(cm): </label>
                <span id="height_cm">{dogInfo.height_cm} </span>
              </p>
              <p>
                <label htmlFor="color">Color: </label>
                <span id="color">{dogInfo.color} </span>
              </p>
              <p>
                <label htmlFor="gender">Gender: </label>
                <span id="gender">{dogInfo.gender} </span>
              </p>
              <p>
                <label htmlFor="microchip">Microchip number: </label>
                <span id="microchip">{dogInfo.microchip} </span>
              </p>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

*/