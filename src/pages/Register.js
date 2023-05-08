import React from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { Link } from 'react-router-dom'


function Register () {
  return (
    <div className='auth-center-container'>
      <div className='auth-content logo-container'>
        <img className='logo-content' src='https://i.imgur.com/qaZ4f4R.png' />
      </div>
      <div className='auth-content'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register