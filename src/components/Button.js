import React from 'react'
import "./styles/Button.css";

function Button(props) {
  return (
    <div className='btn'>{props.title}</div>
  )
}

export default Button