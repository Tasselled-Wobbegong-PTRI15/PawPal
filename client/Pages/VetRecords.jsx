import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "../Navigation.jsx";
import Header from "../components/Header.jsx"

const VetRecords = () => {
  // access query parameter 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pet_id = queryParams.get('pet_id');
  const [vetEntries, setVetEntries] = useState([]);

  // useEffect(() => {
  //   const fetchVetEntries = async () => {
  //     try {
  //       // const response = await fetch(`api/vetrecords?`)
  //     }
  //   }
  // })
  return (
    <div>
      <Header />
      <Navigation pet_id={pet_id} />
      <h2>Vet Records</h2>

    </div>
  );
};

export default VetRecords;
