import React from 'react'
import "./styles/Card.css"
import { Link } from 'react-router-dom'
function QuestionCard(props) {
  const question = props.question
  const url = "/question/" + question.courseCode + '/' + question.courseName.replaceAll(' ', '%20') + '/' + question.batch + '/' + question.examType + '/' + question._id
  console.log(url)
  return (
    <Link to={url} className='card'>
      <div className='card-header question-card-header'>
        <h2 className='card-header-h2 clickable-light'> Batch {props.examBatch}</h2>
        <div className='btn light'>{props.examType} </div>
      </div>
      <h3 className='card-subtext clickable-dark'>Teacher: {props.teacherName}</h3>
      
    </Link>
  )
}

export default QuestionCard