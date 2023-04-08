import React from 'react'
import CourseCard from './CourseCard'
import './styles/FoldableContainer.css'

function FoldableContainer(props) {
  return (
    <div className='foldable-container'>
        <div className='foldable-container-header'>
            <h1>{props.semester}</h1>
            
        </div>
        <div className='foldable-container-content'>
            <CourseCard courseCode="CSE-1101" courseName="Fundamentals of Computer and Basic Knowledge of the World" />
            <CourseCard courseCode="CSE-1102" courseName="Physics" />
            
        </div>
        
    </div>
  )
}

export default FoldableContainer