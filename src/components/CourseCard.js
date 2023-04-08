import React from 'react';
import "./styles/Card.css";
function CourseCard(props) {
  return (
    <div className='card'>
      <div className='card-header'>
        <h2>{props.courseCode}</h2>
      </div>
      
      <h3 className='card-subtext'>{props.courseName}</h3>
    </div>
  )
}

export default CourseCard