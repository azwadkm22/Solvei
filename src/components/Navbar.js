import React, { useEffect, useRef, useState } from 'react'
import "./styles/Navbar.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hook/useAuthContext'
import { useLogout } from '../hook/useLogout'
import SearchBar from './SearchBar';
import Swal from 'sweetalert2';

function Navbar() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const logout  = useLogout();
  const location = useLocation()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileBtnRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false); 
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileBtnRef.current && !profileBtnRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileBtnRef]);

  const handleLogout = ()=> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'swal-btn swal-btn-success',
        cancelButton: 'swal-btn swal-btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Do you want to Log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        if (location.pathname === '/profile') {
          navigate('/')
        }
        else {
          navigate(location.pathname)
        }
        swalWithBootstrapButtons.fire(
          'Logged out',
          "",
          'info'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }

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
      <div className='navbar-ham-menu' >
        <svg onClick={() => {setMenuOpen(!menuOpen)}} width="24" height="20" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.75C0 0.551088 0.0790176 0.360322 0.21967 0.21967C0.360322 0.0790175 0.551088 0 0.75 0H15.25C15.4489 0 15.6397 0.0790175 15.7803 0.21967C15.921 0.360322 16 0.551088 16 0.75C16 0.948912 15.921 1.13968 15.7803 1.28033C15.6397 1.42098 15.4489 1.5 15.25 1.5H0.75C0.551088 1.5 0.360322 1.42098 0.21967 1.28033C0.0790176 1.13968 0 0.948912 0 0.75ZM0 5C0 4.80109 0.0790176 4.61032 0.21967 4.46967C0.360322 4.32902 0.551088 4.25 0.75 4.25H15.25C15.4489 4.25 15.6397 4.32902 15.7803 4.46967C15.921 4.61032 16 4.80109 16 5C16 5.19891 15.921 5.38968 15.7803 5.53033C15.6397 5.67098 15.4489 5.75 15.25 5.75H0.75C0.551088 5.75 0.360322 5.67098 0.21967 5.53033C0.0790176 5.38968 0 5.19891 0 5ZM0.75 8.5C0.551088 8.5 0.360322 8.57902 0.21967 8.71967C0.0790176 8.86032 0 9.05109 0 9.25C0 9.44891 0.0790176 9.63968 0.21967 9.78033C0.360322 9.92098 0.551088 10 0.75 10H15.25C15.4489 10 15.6397 9.92098 15.7803 9.78033C15.921 9.63968 16 9.44891 16 9.25C16 9.05109 15.921 8.86032 15.7803 8.71967C15.6397 8.57902 15.4489 8.5 15.25 8.5H0.75Z" fill="#efefef" />
        </svg>

        {
          menuOpen ? 
            <div className='navbar-ham-menu-dropdown'>
              <ul className='menu-nav-links'>
                <li className='menu-nav-link'> 
                 <SearchBar /> 
                </li>
                {
                  user ?
                    <Link className='menu-nav-link' to="/upload">
                      <li >
                      Upload Question?
                      </li>
                    </Link >
                    :
                    <></>
                }
              
                {
                  user ?
                    <Link to="/profile" state={{
                      email: user.email
                    }} className='menu-nav-link'>
                    <li >Go to Profile</li>
                    </Link >
                    :
                    <> </>
                    
                  }
                

                {
                  !user ?
                    <Link to="/login" className='menu-nav-link'>
                        <li >Login </li>
                    </Link >
                    :
                    <li className='menu-nav-link' onClick={handleLogout}>Log out</li>
                    
                }

                <li className='menu-empty'></li>
                <li className='menu-empty'></li>
                
              </ul>

            </div>
            :

            <></>

        }
        
      </div>

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
              <div ref={profileBtnRef} className='profile-btn' onClick={() => {setShowProfileDropdown(true)}}>
                Profile

                {
                  !showProfileDropdown ? 
                  <></>
                  :
                    <div className='profile-dropdown-container'>
                      <div className='profile-dropdown-list'>
                          <Link to="/profile" state={{
                            email: user.email
                          }}>
                          <div className='profile-dropdown-option'>Go to Profile</div>
                          </Link >
                          
                        
                        <div className='profile-dropdown-option' onClick={handleLogout}>Log out</div>
                      </div>
                    </div>
                }
              </div>
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