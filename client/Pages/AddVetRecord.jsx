import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "../Navigation.jsx";

const AddVetRecord = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pet_id = queryParams.get('pet_id');

  const [vetRecordInfo, setVetRecordInfo] = useState({
    date_of_visit: '',
    description: '',
    notes: '',
  });

  const handleChange = (e) => {
    setVetRecordInfo({ ...vetRecordInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/vet_records?pet_id=${pet_id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vetRecordInfo),
      });

      if (response.ok) {
        navigate(`/vetrecords?pet_id=${pet_id}`);
      } else {
        console.log("Failed to add vet record");
      }
    } catch (error) {
      console.log("Error happened in POST request", error);
    }
  };

  return (
    <div>
      <Navigation pet_id={pet_id} />
      <h2>Add Vet Record</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date_of_visit">Date of Visit:</label>
          <input
            type="date"
            id="date_of_visit"
            name="date_of_visit"
            value={vetRecordInfo.date_of_visit}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={vetRecordInfo.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={vetRecordInfo.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Vet Record</button>
      </form>
    </div>
  );
};

export default AddVetRecord;
