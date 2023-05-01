import React from 'react'
import { useState } from 'react'
import "./styles/SearchResult.css";
import QuestionCard from '../components/QuestionCard';
import CourseCard from '../components/CourseCard';
import { useLocation } from 'react-router-dom';
import QuestionResultCard from '../components/QuestionResultCard';



function SearchResult() {
  const location = useLocation()
  const typeQuestion = location.state.typeQuestion
  console.log("typeQuestion:", typeQuestion)
  const result = location.state.parameter
  
  const getQuestions = () => {
    return result.map((question, index) => (
      <QuestionResultCard key={index} question={question} examBatch={question.batch} courseCode={question.courseCode} examType={question.examType} teacherName={question.teacher} />
    ));
  };

  const getCourses = () => {
    return result.map((course, index) => (
      <CourseCard key={index} courseCode={course.courseCode} courseName={course.courseName}/>
    ));
  };

  return (  
    <div>
      <div className='result-divider'>
        <h3>Search Results</h3>
      </div>
      <div>
        { typeQuestion ? 
        
            <div className='search-result-container'> 
              {/* <QuestionCard examBatch="Batch 25" courseCode="CSE-4101" examType="Final" teacherName="Asif Hossain Khan" /> */}
              {getQuestions()}
            </div>
            
            :
            <div className='search-result-container'> 
              {/* <CourseCard courseCode="CSE-1102" courseName="Physics" /> */}
              {getCourses()}
            </div>
        
        }

      </div>
    </div>
  )
}

export default SearchResult