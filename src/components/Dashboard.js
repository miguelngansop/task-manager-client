import React, { useState, useEffect } from 'react'
import Navbar from './Navbar/Navbar'
import TaskList from './TaskList'
const Dashboard = () => {

  const menuProfile = "Profile"
  const menuLogout = "Logout";



  return (
    <>
      <Navbar menuProfile={menuProfile} menuLogout={menuLogout} />
      <TaskList />
    </>
  )
}

export default Dashboard
