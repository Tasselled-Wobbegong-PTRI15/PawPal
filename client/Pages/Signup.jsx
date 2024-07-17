
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // Define variables to store user input for email, username, password
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [error, setError] = useState(null);

  const { email, password, username } = inputs;

  const navigate = useNavigate();

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, username };
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration unsuccessful");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="forms">
      <div className="form-content">
        <div className="form">
          <div className="title">Register</div>
          <form onSubmit={handleSubmit}>
          <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={onChange}
                required
              />
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            </div>

            <div className="button input-box">
              <button type="submit" className="btn">Sign up</button>
            </div>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;


