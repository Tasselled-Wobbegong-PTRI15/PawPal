import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, Link } from "react-router-dom";
import Navigation from "../Navigation.jsx"; 
import Header from "../components/Header.jsx"


const Journal = () => {

  // access query parameter 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pet_id = queryParams.get('pet_id');
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await fetch(`/api/alljournals?dog_id=${pet_id}`);
        console.log("fetch succesful")
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
      < Header />
      <Navigation pet_id={pet_id} />
      <h2 className="journal-header"></h2>
      <div className="button-container">
      <Link to={`/addjournal?pet_id=${pet_id}`}>
        <button className="add-journal-btn">Add Journal Entry</button>
      </Link>
      </div>
      <div className='journal-list-wrapper'>
        <ul className="journal-list">
          {journalEntries.map((entry) => (
            <li key={entry.id} className="journal-entry">
              <p className="journal-date">{new Date(entry.created_at).toLocaleString()}</p>
              <h3>{entry.title}</h3>
              {entry.photo_url && <img src={entry.photo_url} alt={entry.title} />}
              <p>{entry.text_input}</p>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default Journal;