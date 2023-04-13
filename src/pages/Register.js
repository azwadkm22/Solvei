import React from 'react'
import LoginForm from '../components/LoginForm'
import "./styles/Auth.css"
import RegisterForm from '../components/RegisterForm'
import { Link } from 'react-router-dom'


function Register () {
  return (
    <div className='auth-center-container'>
      <div className='auth-content'>
        <img className='logo-content' src='https://i.imgur.com/qaZ4f4R.png' />
      </div>
      <div className='auth-content form-content'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register