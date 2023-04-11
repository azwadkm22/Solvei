import React from 'react';
import "./styles/Card.css";
import { Link } from 'react-router-dom';


function CourseCard(props) {
  return (
      <Link to="/question" className='card'>
        <div className='card-header'>
          <h2>{props.courseCode}</h2>
        </div>
        <h3 className='card-subtext'>{props.courseName}</h3>
      </Link >
  )
}

export default CourseCard