import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "../Navigation.jsx"; 

const Dog = () => {
  // access query parameter 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pet_id = queryParams.get('pet_id');
  console.log('pet_id is', pet_id);

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

  console.log("state is", dogInfo);

  useEffect(() => {
    const displayDogInfo = async () => {
      console.log("displayDogInfo is running");
      try {
        const response = await fetch(`/api?pet_id=${petId}`);
        const result = await response.json();
        // console.log("result", result);
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
        setDogInfo(result);
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

  return (
    <div>
      <Navigation pet_id={pet_id} />
      <Routes>
        <Route
          path="/"
          element={
            isEditing ? (
              <div>
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
              <div>
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
            )
          }
        />
        <Route
          path="VaccineRecords"
          element={
            <div>
              <h2>Vaccine Records</h2>
            </div>
          }
        />
        <Route
          path="HaircutRecords"
          element={
            <div>
              <h2>Haircut Records</h2>
            </div>
          }
        />
        <Route
          path="tricks"
          element={
            <div>
              <h2>Tricks</h2>
            </div>
          }
        />
        <Route
          path="journal"
          element={
            <div>
              <h2>Journal</h2>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default Dog;

