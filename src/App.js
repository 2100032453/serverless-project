import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'; // Import Routes, Route, and useNavigate
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Forms from './Forms';

const App = () => {
  

  return (
    <div>
      {/* Routes */}
      <Routes>
        {/* Route for Forms component */}
        <Route path="/" element={<Forms />} />
        {/* Route for Home component */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
