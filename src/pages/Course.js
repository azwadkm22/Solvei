import "./styles/Course.css"
import React from 'react'
import { useLocation } from "react-router-dom";
import QuestionCard from '../components/QuestionCard'
import { position } from "../utils/constants";

function Course(props) {
  const location = useLocation()
  console.log(location)
  const { courseCode, courseName } = location.state;
  console.log(courseCode, courseName)

  const getSemesterYear = () => {
    const [letter, code] = courseCode.split('-')
    const semYear = position[code[0] - '0'] + " Year "+ position[code[1] - '0'] + " Semester"; 
    // console.log("semyear: ", semYear)
    return semYear
  }

  return (
    
    <div className="course-body">
      <header className="course-body-header">
        <div className='first-line'>
          <h1 className="course-page-h1">{courseCode}</h1>
          <h2 className="course-page-h2">{getSemesterYear()}</h2>
        </div>
        <h1 className="course-page-h1">{courseName}</h1>
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
            <QuestionCard examBatch="Batch 25" examType="Final" teacherName="Asif Hossain Khan" />
            <QuestionCard examBatch="Batch 24" examType="Final" teacherName="Abu Ahmed Ferdaus" />
            <QuestionCard examBatch="Batch 23" examType="Incourse" teacherName="Asif Hossain Khan" />
            <QuestionCard examBatch="Batch 25" examType="Final" teacherName="Asif Hossain Khan" />
        
        </div>

      </div>
    </div>
   
  )
}

export default Course