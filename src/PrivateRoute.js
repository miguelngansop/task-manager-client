import React from 'react'
import { Route, Redirect } from "react-router-dom"
import authService from './services/authService';

export default function PriveteRoute({ component: Component, ...rest}) {

  const  currentUser  = authService.getCurrentUser();

  return (
    <Route {...rest}
    render={props => {
     return currentUser ? <Component {...props} /> : <Redirect to="/login" />
    }} ></Route>
  )
}
