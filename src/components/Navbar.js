import React from 'react'
import "./styles/Navbar.css"
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <Link to="/" className='title'>
          <div>Solvei</div>
        </Link>

      <Link to="/question" className="profile-btn">
            Profile
        </Link >
    </div>
  )
}

export default Navbar