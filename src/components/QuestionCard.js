import React from 'react'
import "./styles/Card.css"
import { Link } from 'react-router-dom'
function QuestionCard(props) {
  return (
    <Link to="/question" className='card'>
      <div className='card-header question-card-header'>
        <h2>{props.examBatch}</h2>
        <div className='btn light'>{props.examType} </div>
      </div>
      <h3 className='card-subtext'>Teacher: {props.teacherName}</h3>
      
    </Link>
  )
}

export default QuestionCard