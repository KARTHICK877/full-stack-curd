import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './Welcome';
import SignUp from './SignUp';
import Discussion from './Discussion';
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/welcome"
          element={<Welcome />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/discussion"
          element={<Discussion />}
        />
         {/* <ToastContainer /> */}
        <Route
          path="/*"
          element={<Navigate to="/signup" />}
        />
      </Routes>
    </Router>
  );
};

export default App;