import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, Link } from "react-router-dom";
import Navigation from "../Navigation.jsx";
import Header from "../components/Header.jsx"

const VetRecords = () => {
  // access query parameter 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pet_id = queryParams.get('pet_id');
  const [vetEntries, setVetEntries] = useState([]);

  useEffect(() => {
    const fetchVetEntries = async () => {
      try {
        const response = await fetch(`api/all_records?pet_id=${pet_id}`);
        console.log('fetch success')
        const result = await response.json();
        setVetEntries(result);
      } catch (error) {
        console.log("Error fetching vet entries", error);
      }
    };

    fetchVetEntries();
  }), [pet_id];

  return (
    <div>
      <Header />
      <Navigation pet_id={pet_id} />
      <h2>Vet Records</h2>
      <Link to={`/addvetrecord?pet_id=${pet_id}`}>
        <button>New Vet Record</button>
      </Link>
      <ul>
        {vetEntries.map((entry) => (
          <li key={entry.id}>
            <p>Date of Visit: {new Date(entry.date).toLocaleDateString()}</p>
            <p>Description: {entry.description}</p>
            <p>Notes: {entry.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VetRecords;
