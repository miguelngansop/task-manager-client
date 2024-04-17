
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard';
import SignUp from "./components/SignUp/SignUp";
import PriveteRoute from "./PrivateRoute";
import { Redirect } from 'react-router-dom';
import authService from './services/authService';


// Function to check if the user is logged in (simulated here)
const isUserLoggedIn = () => {
  const userData = authService.getCurrentUser();
  console.log(userData);
  if(userData) {
    return true; // or false depending on the login status
  } else{
    return false
  }
};

// PrivateRoute component for routes accessible only to logged-in users
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isUserLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

// App component
const App = () => {
  return (
    <Router>
      <Switch>
        {/* Redirect to dashboard if the user is logged in */}
        <PrivateRoute exact path="/" component={Dashboard} />
         {/* Redirect to signup page if the user is not logged in */}
         <Route path="/signup" component={SignUp} />
        {/* Redirect to login page if the user is not logged in */}
        <Route path="/login" component={Login} />
        
      </Switch>
    </Router>
  );
};

export default App;
