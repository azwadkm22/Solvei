import "./styles/Course.css"
import React from 'react'
import QuestionCard from '../components/QuestionCard'

function Course(props) {
  return (
    <div>
      <header>
        <div className='first-line'>
          <h1>{props.courseCode}</h1>
          <h2>{props.semesterYear}</h2>
        </div>
        <h1>{props.courseName}</h1>
      </header>
      <div className='question-card-section'>
        <div className='question-divider'>
            <h3>Questions</h3>
        </div>
        <div className='question-card-container'> 
            <QuestionCard examBatch="Batch 25" examType="Final" teacherName="Asif Hossain Khan"/>
            <QuestionCard examBatch="Batch 24" examType="Final" teacherName="Abu Ahmed Ferdaus" />
            <QuestionCard examBatch="Batch 23" examType="Incourse" teacherName="Asif Hossain Khan" />
            <QuestionCard examBatch="Batch 25" examType="Final" teacherName="Asif Hossain Khan" />
            <QuestionCard examBatch="Batch 24" examType="Final" teacherName="Abu Ahmed Ferdaus" />

        
        </div>

      </div>
    </div>
   
  )
}

export default Course