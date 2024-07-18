import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ pet_id }) => {
  return (
    <nav>
      <Link to={`/dog?pet_id=${pet_id}`}>Your Dogs</Link>
      <Link to={`/VaccineRecords/?pet_id=${pet_id}`}>Vaccine Records</Link>
      <Link to={`/HaircutRecords?pet_id=${pet_id}`}>Haircut Records</Link>
      <Link to={`/tricks?pet_id=${pet_id}`}>Tricks</Link>
      <Link to={`/journal?pet_id=${pet_id}`}>Journal</Link>
    </nav>
  );
};

export default Navigation;