import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ pet_id }) => {
  return (
    <nav className='navbar'>
      <Link to={`/dog?pet_id=${pet_id}`} className='nav-link'>Profile</Link>
      <Link to={`/VaccineRecords/?pet_id=${pet_id}`} className='nav-link'>Vaccine Records</Link>
      <Link to={`/HaircutRecords?pet_id=${pet_id}`} className='nav-link'>Haircut Records</Link>
      <Link to={`/tricks?pet_id=${pet_id}`} className='nav-link'>Tricks</Link>
      <Link to={`/journal?pet_id=${pet_id}`} className='nav-link'>Journal</Link>
    </nav>
  );
};

export default Navigation;