import React from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddDog from './Pages/AddDog.jsx';
import Dog from './Pages/Dog.jsx';
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import Main from './Pages/Main.jsx';
import VaccineRecords from "./Pages/VaccineRecords.jsx";
import HaircutRecords from './Pages/HaircutRecords.jsx';
import Tricks from './Pages/tricks.jsx';
import Journal from './Pages/journal.jsx';
import AddJournal from "./Pages/AddJournal.jsx";
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
        <Route path='/addjournal' element={<AddJournal />} />
        </Routes>
    </Router>
  );
};

export default App;



/* original 

http://localhost:8080/dog/?dog_id=17

console.js:273 No routes matched location "/dog/?dog_id=17"  
    at Routes (

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

// 2nd 
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/adddog' element={<AddDog />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dog' element={<Dog />} >
            <Route path= 'dog/?dog_id'>
              <Route path= '?dog_id/VaccineRecords' element = {<VaccineRecords />} />
              <Route path= '?dog_id/HaircutRecords' element = {<HaircutRecords />} />
            </Route>
          </Route>
          <Route path='/tricks' element={<Tricks />} />
        <Route path='/journal' element={<Journal />} />
        </Routes>
    </Router>
  );
};

*/