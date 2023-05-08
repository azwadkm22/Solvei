import "./styles/Course.css"
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import QuestionCard from '../components/QuestionCard'
import { API_BASE_URL, QUESTION_SEARCH,position } from "../utils/constants";
import Axios from "axios";

function Course() {
  const [questions, setQuestions] = useState([]);
  // console.log("location in course.js: ",location)
  const { courseCode, courseName } = useParams();

  const getSemesterYear = () => {
    const [letter, code] = courseCode.split('-')
    const semYear = position[code[0] - '0'] + " Year "+ position[code[1] - '0'] + " Semester"; 
    // console.log("semyear: ", semYear)
    return semYear
  }

  useEffect(() => {
    const courseUrl = courseCode + ': ' + courseName
    Axios.get(API_BASE_URL + QUESTION_SEARCH + 'course=' + courseUrl)
      .then((response) => {
        setQuestions(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const getQuestionCards = ()=> {
    return questions.map((question, index) => (
      <QuestionCard key={index} examBatch={question.batch} examType={question.examType} 
        teacherName={question.teacher} courseCode={question.courseCode} question={question}  />
    ));
  };

  return (
    
    <div className="course-body">
      <header className="course-body-header">
        <div className='first-line'>
          <h1 className="course-page-h1">{courseCode}</h1>
          <h2 className="course-page-h2">{getSemesterYear()}</h2>
        </div>
        <h1 className="course-page-h1">{courseName.replaceAll("%20", ' ')}</h1>
      </header>
      <div className='question-card-section'>
        <div className='content-divider'>
            <h3>Questions</h3>
        </div>
        <div className='card-content-container question-card-content-container'> 
            {getQuestionCards()}
        </div>

      </div>
    </div>
   
  )
}

export default Course