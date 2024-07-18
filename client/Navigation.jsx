import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      {/* add link to each page */}
      <Link to="/dog">Your Dogs</Link>
      <Link to="/dogs/:dog_id/VaccineRecords">Vaccine Records</Link>
      <Link to="/HaircutRecords">Haircut Records</Link>
      <Link to="/tricks">Tricks</Link>
      <Link to="/journal">Journal</Link>
    </nav>
  );
};

export default Navigation;


