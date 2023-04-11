import React from 'react'
import LoginForm from '../components/LoginForm'
import "./styles/Auth.css"
import RegisterForm from '../components/RegisterForm'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='auth-center-container'>
      <div className='auth-content'>
        <img className='logo-content' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' />
      </div>
      <div className='auth-content form-content'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register