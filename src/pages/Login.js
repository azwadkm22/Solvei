import React from 'react'
import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='auth-center-container'>
      <div className='auth-content logo-container'> 
        <img className='logo-content' src='https://i.imgur.com/qaZ4f4R.png'/>
      </div>
      <div className='auth-content'> 
        <LoginForm /> 
      </div>
    </div>
  )
}

export default Login