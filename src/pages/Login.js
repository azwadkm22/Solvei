import React from 'react'
import LoginForm from '../components/LoginForm'
import "./styles/Auth.css"
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='auth-center-container'>
      <div className='auth-content'> 
        <img className='logo-content' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'/>
      </div>
      <div className='auth-content form-content'> 
        <LoginForm /> 
      </div>
    </div>
  )
}

export default Login