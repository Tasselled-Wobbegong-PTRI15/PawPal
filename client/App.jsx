import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddDog from './Pages/AddDog.jsx';
import Dog from './Pages/Dog.jsx';
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import Main from './Pages/Main.jsx';
import VaccineRecords from "./Pages/VaccineRecords.jsx";
import HaircutRecords from './Pages/HaircutRecords.jsx';
import Tricks from './Pages/tricks.jsx';
import Journal from './Pages/journal.jsx';
// import Navigation from './Navigation.jsx'; // => navigation to be moved to 'Dog.jsx' and its child components 

// App component sets up the router and defines all the routes for the application
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/adddog' element={<AddDog />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dog' element={<Dog />} />
          <Route path= '/VaccineRecords' element = {<VaccineRecords />} />
          <Route path= '/HaircutRecords' element = {<HaircutRecords />} />
          <Route path='/tricks' element={<Tricks />} />
        <Route path='/journal' element={<Journal />} />
        </Routes>
    </Router>
  );
};

export default App;



