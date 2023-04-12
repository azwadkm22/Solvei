import CourseCard from './CourseCard'
import './styles/FoldableContainer.css'
import React, { useState, useEffect } from 'react'

function FoldableContainer(props) {
  const [courses, setCourses] = useState(props.courses);

  useEffect(() => {
    setCourses(props.courses);
  }, [props.courses]);

  const getCourseCards = () => {
    console.log("in foldable containers : ",courses);
    return courses.map((course, index) => (
      <CourseCard key={index} courseCode={course.courseCode} courseName={course.courseName} />
    ));
  };


  return (
    <div className='foldable-container'>
      <div className='foldable-container-header'>
          <h1>{props.semester}</h1>
      </div>
      <div className='foldable-container-content'>
          {getCourseCards()}
      </div>
    </div>

  )
}

export default FoldableContainer
