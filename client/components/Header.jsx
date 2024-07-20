import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens (this is just an example, adjust according to your authentication mechanism)
    localStorage.removeItem('authToken');
    
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className='header'>
      <Link to={`/`} className='header-link'>
        {/* header icon is temporary */}
        <img src='https://t4.ftcdn.net/jpg/01/01/41/55/360_F_101415569_akATewxhbvvsRayMdjoOIhPGhYhWMpLn.jpg' alt='icon' height='25px'></img>
      </Link>
      <button onClick={handleLogout} className='logout-button'>
        Logout
      </button>
    </div>
  )
}

export default Header;