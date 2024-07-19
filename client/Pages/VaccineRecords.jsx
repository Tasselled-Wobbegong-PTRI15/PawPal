import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "../Navigation.jsx";
import Header from "../components/Header.jsx"

const VaccineRecords = () => {
  // access query parameter 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pet_id = queryParams.get('pet_id');

  return (
    <div>
      <Header />
      <Navigation pet_id={pet_id} />
      <h2>Vaccine Records</h2>

    </div>
  );
};

export default VaccineRecords;
