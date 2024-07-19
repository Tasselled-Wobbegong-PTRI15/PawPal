import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "../Navigation.jsx";

const AddJournal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pet_id = queryParams.get('pet_id');
  const [title, setTitle] = useState("");
  const [textInput, setTextInput] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text_input", textInput);
    formData.append("dog_id", pet_id);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await fetch("/api/journal", {
        method: "POST",
        body: formData,
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="textInput">Text:</label>
          <textarea
            id="textInput"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <button type="submit">Add Journal Entry</button>
      </form>
    </div>
  );
};

export default AddJournal;
