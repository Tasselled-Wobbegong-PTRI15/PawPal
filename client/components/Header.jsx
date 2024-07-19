import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Header = () => {
 
  return (
    <div>
      <Link to={`/`}>
        {/* header icon is temporary */}
        <img src='https://t4.ftcdn.net/jpg/01/01/41/55/360_F_101415569_akATewxhbvvsRayMdjoOIhPGhYhWMpLn.jpg' alt='icon' height='25px'></img>
      </Link>
    </div>
  )
}

export default Header;