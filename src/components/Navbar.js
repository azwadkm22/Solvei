import React from 'react'
import "./styles/Navbar.css"
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hook/useAuthContext'

function Navbar() {
  const {user} = useAuthContext();

  return (
    <div className='navbar'>
        <Link to="/" className='title'>
          <div>Solvei</div>
        </Link>

        {!user && <Link to="/login" className="profile-btn">
            Login
        </Link >}

        {user && <Link to="/profile" state = {{
            email: user.email
          }} className="profile-btn">
            Profile
        </Link >}
    </div>
  )
}

export default Navbar