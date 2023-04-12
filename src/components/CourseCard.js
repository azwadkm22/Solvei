import React from 'react';
import "./styles/Card.css";
import { Link } from 'react-router-dom';


function CourseCard(props) {
  
  return (
    <Link to = "/course"
          state = {{
            courseCode: props.courseCode,
            courseName: props.courseName
          }}
         className='card'>
        <div className='card-header'>
        <h2 className='card-header-h2 clickable-light'>{props.courseCode}</h2>
        </div>
      <h3 className='card-subtext clickable-dark'>{props.courseName}</h3>
      </Link >
  )
}

export default CourseCard