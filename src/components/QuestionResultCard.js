import React from 'react'
import "./styles/Card.css"
import { Link } from 'react-router-dom'
function QuestionResultCard(props) {
    return (
        <Link to="/question" state={{ parameter: props.question }} className='card'>
            <div className='card-header question-card-header'>
                <h2 className='card-header-h2 clickable-light'> {props.courseCode} : Batch {props.examBatch}</h2>
                <div className='btn smaller light'>{props.examType} </div>
            </div>
            <h3 className='card-subtext clickable-dark'>Teacher: {props.teacherName}</h3>

        </Link>
    )
}

export default QuestionResultCard