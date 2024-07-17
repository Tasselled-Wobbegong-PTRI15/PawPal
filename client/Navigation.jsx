import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      {/* add link to each page */}
      <Link to="/">Home</Link>
      <Link to="/dog">Dog</Link>
    </nav>
  );
};

export default Navigation;