import React from 'react'
import { useState } from 'react'
import "./styles/SearchResult.css";
import QuestionCard from '../components/QuestionCard';
import CourseCard from '../components/CourseCard';

const typeQuestion = false;

function SearchResult() {
  const [resultType, setResultType] = useState(typeQuestion)
  
  return (  
    <div>
      <div className='result-divider'>
        <h3>Search Results</h3>
      </div>
      <div>
        { typeQuestion ? 
        
            <div className='search-result-container'> 
              <QuestionCard examBatch="Batch 25" courseCode="CSE-4101" examType="Final" teacherName="Asif Hossain Khan" />
              <QuestionCard examBatch="Batch 24" courseCode="CSE-4101" examType="Final" teacherName="Abu Ahmed Ferdaus" />
              <QuestionCard examBatch="Batch 23" courseCode="CSE-4101" examType="Incourse" teacherName="Asif Hossain Khan" />
              <QuestionCard examBatch="Batch 25" courseCode="CSE-4101" examType="Final" teacherName="Asif Hossain Khan" />
              <QuestionCard examBatch="Batch 24" courseCode="CSE-4101" examType="Final" teacherName="Abu Ahmed Ferdaus" />
              <QuestionCard examBatch="Batch 25" courseCode="CSE-4101" examType="Final" teacherName="Asif Hossain Khan" />
              <QuestionCard examBatch="Batch 24" courseCode="CSE-4101" examType="Final" teacherName="Abu Ahmed Ferdaus" />
              <QuestionCard examBatch="Batch 23" courseCode="CSE-4101" examType="Incourse" teacherName="Asif Hossain Khan" />
              <QuestionCard examBatch="Batch 25" courseCode="CSE-4101" examType="Final" teacherName="Asif Hossain Khan" />

            </div>
            
            :
            <div className='search-result-container'> 
            <CourseCard courseCode="CSE-1101" courseName="Fundamentals of Computer and Basic Knowledge of the World" />
            <CourseCard courseCode="CSE-1102" courseName="Physics" />
            <CourseCard courseCode="CSE-1101" courseName="Fundamentals of Computer and Basic Knowledge of the World" />
            <CourseCard courseCode="CSE-1102" courseName="Physics" />
            <CourseCard courseCode="CSE-1101" courseName="Fundamentals of Computer and Basic Knowledge of the World" />
            <CourseCard courseCode="CSE-1102" courseName="Physics" />
            <CourseCard courseCode="CSE-1101" courseName="Fundamentals of Computer and Basic Knowledge of the World" />
            <CourseCard courseCode="CSE-1102" courseName="Physics" />
            </div>
        
        }

      </div>
    </div>
  )
}

export default SearchResult