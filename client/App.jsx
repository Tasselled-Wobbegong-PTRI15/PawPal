import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Pages/Main.jsx';
import Dog from './Dog.jsx';
import Signup from './Pages/Signup.jsx';
import Navigation from './Navigation.jsx';
import Login from './Pages/Login.jsx';


const App = () => {
  return (
    <Router>
      <div className='home'>
        <h1>Hello</h1>
        <Navigation />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/dog' element={<Dog />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
