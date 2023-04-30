import React from 'react'
import "./styles/Navbar.css"
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hook/useAuthContext'
import SearchBar from './SearchBar';

function Navbar() {
  const {user} = useAuthContext();

  return (
    <div className='navbar'>
        <Link to="/" className='title'>
          <div>Solvei</div>
        </Link>

        <ul className='nav-links'>
        <li className='nav-link'> <SearchBar />
          </li>
        </ul>
        
        <div className="empty-div-with-width"></div>
      

        <ul className='nav-links'>
        <li className='nav-link'>
          {
            user ?
              <Link to="/upload" className="upload-redir">
                Upload Question?
              </Link >
              :
              <></>

          }
          </li>
        <li className='nav-link'>
          {
            user ?
              <Link to="/profile" state={{
                email: user.email
              }} className="profile-btn">
                Profile
              </Link >
              :
              <Link to="/login" className="profile-btn">
                Login
              </Link >
          }
          </li>

        </ul>



    </div>
  )
}

export default Navbar