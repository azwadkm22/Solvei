import React from 'react'
import Button from './Button'
import "./styles/Navbar.css"

function Navbar() {
  return (
    <div className='navbar'>
        <p className='title'>Solvei</p>
        <Button title="Profile"/>
    </div>
  )
}

export default Navbar