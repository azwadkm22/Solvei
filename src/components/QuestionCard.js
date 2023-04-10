import React from 'react'
import Button from './Button'
import "./styles/Card.css"
function QuestionCard(props) {
  return (
    <div className='card question-card'>
      <div className='card-header question-card-header'>
        <h2>{props.examBatch}</h2>
        <Button title={props.examType}/>
      </div>

      <h3 className='card-subtext'>Teacher: {props.teacherName}</h3>
    </div>
  )
}

export default QuestionCard