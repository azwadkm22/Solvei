import React from 'react'
import Button from './Button'
import "./styles/Navbar.css"
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <Link to="/" className='title'>
          <div>Solvei</div>
        </Link>

        <Link to="/question" className='profile-btn'>
            <Button title="Profile" />
        </Link >
    </div>
  )
}

export default Navbar