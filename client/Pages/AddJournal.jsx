import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "../Navigation.jsx";

const AddJournal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pet_id = queryParams.get('pet_id');
  // const [title, setTitle] = useState("");
  // const [textInput, setTextInput] = useState("");
  // const [photo, setPhoto] = useState(null);
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
    
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("text_input", textInput);
    // formData.append("dog_id", pet_id);
    // if (photo) {
    //   formData.append("photo", photo);
    // }
    // console.log('state', journalInfo);
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
      <Navigation pet_id={pet_id} />
      <h2>Add Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={journalInfo.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="textInput">Text:</label>
          <textarea
            id="textInput"
            name="text_input"
            value={journalInfo.text_input}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="photo">Photo:</label>
          <input
            id="photo"
            name="photo_url"
            value={journalInfo.photo_url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Journal Entry</button>
      </form>
    </div>
  );
};

export default AddJournal;
