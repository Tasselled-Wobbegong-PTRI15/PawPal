import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, Link } from "react-router-dom";
import Navigation from "../Navigation.jsx"; 


const Journal = () => {

  // access query parameter 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pet_id = queryParams.get('pet_id');
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await fetch(`/api/journal?dog_id=${pet_id}`);
        const result = await response.json();
        setJournalEntries(result);
      } catch (error) {
        console.log("Error fetching journal entries:", error);
      }
    };

    fetchJournalEntries();
  }, [pet_id]);


return (
  <div>
    {/* pass pet_id to Navigation as props */}
    <Header />
    <Navigation pet_id={pet_id} />
    <h2>Journal</h2>
    <Link to={`/addjournal?pet_id=${pet_id}`}>
      <button>Add Journal Entry</button>
    </Link>
    <ul>
      {journalEntries.map((entry) => (
        <li key={entry.id}>
          <h3>{entry.title}</h3>
          <p>{entry.text_input}</p>
          {entry.photo_url && <img src={entry.photo_url} alt={entry.title} />}
          <p><small>{new Date(entry.created_at).toLocaleString()}</small></p>
        </li>
      ))}
    </ul>
  </div>
);
};

export default Journal;