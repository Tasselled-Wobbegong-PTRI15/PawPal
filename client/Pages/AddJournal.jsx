import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "../Navigation.jsx";
import Header from "../components/Header.jsx"

const AddJournal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pet_id = queryParams.get('pet_id');

  const [journalInfo, setJournalInfo] = useState({
    title: '',
    text_input: '',
    photo_url: '',
  });

  const handleChange = (e) => {
    console.log('e.target.name ', e.target.name);
    console.log('e.target.value ', e.target.value);
    setJournalInfo({ ...journalInfo, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/journal?pet_id=${pet_id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(journalInfo),
      });

      if (response.ok) {
        navigate(`/journal?pet_id=${pet_id}`);
      } else {
        console.log("Failed to add journal entry");
      }
    } catch (error) {
      console.log("Error happened in POST request", error);
    }
  };

  return (
    <div>
      < Header />
      <Navigation pet_id={pet_id} />
      <div className="add-journal-container">
      <div className="add-journal-wrapper">
        <h2 className="title">Add Journal Entry</h2>
        <form onSubmit={handleSubmit} className="journal-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={journalInfo.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="textInput">Tell a story</label>
            <textarea
              id="textInput"
              name="text_input"
              value={journalInfo.text_input}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Add a photo</label>
            <input
              id="photo"
              name="photo_url"
              value={journalInfo.photo_url}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn">Add Journal Entry</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddJournal;
