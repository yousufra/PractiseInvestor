import React from 'react'
import NavBar from '../NavBar/navBar';
import Dashboard from '../Dashboard/dashboard';
import Order from '../Order/order';


const Homepage = () => {
  return (
    <>
      <NavBar></NavBar>
      <Dashboard></Dashboard>
      <Order></Order>
    </>
  )
}

export default Homepage
