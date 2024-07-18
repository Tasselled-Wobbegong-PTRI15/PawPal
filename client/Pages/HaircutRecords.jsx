import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "../Navigation.jsx"; 

const HaircutRecords = () => {
  // access query parameter 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pet_id = queryParams.get('pet_id');

  return (
    <div>
      <Navigation pet_id={pet_id} />
      <h2>Haircut Records</h2>

    </div>
  );
};

export default HaircutRecords;
