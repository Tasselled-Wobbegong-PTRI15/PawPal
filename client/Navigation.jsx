import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dog">Dog</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
};

export default Navigation;
