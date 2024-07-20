import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Main from "./Main.jsx";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState('');

  const { username, password } = inputs;

  const navigate = useNavigate();

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.username.trim() || !inputs.password.trim()) {
      setError('username and password cannot be empty!');
      return;
    }
    setError('');

    try {
      const body = { username, password };
      const response = await fetch("/login", {
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
        setError(errorData.message || "Login unsuccessful");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="forms">
      <div className="login-header">
      <h1>Paw Pal</h1>
      </div>
      <div className="form-content">
        <div className="form">
        <div className="title">
          <div className="title"></div>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={onChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
                required
              />
            </div>

            <div className="button input-box">
              <button type="submit" className="Btn">Login</button>
            </div>
            <div className = "hyperlink">
            <p><a href="/Signup">New around here? Sign up</a></p>
            </div>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login; 

