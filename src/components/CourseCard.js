import React from 'react';
import "./styles/Card.css";
import { Link } from 'react-router-dom';


function CourseCard(props) {
  const url = "/course/" + props.courseCode + '/' + props.courseName.replaceAll(' ', "%20")
  console.log("from courseCard url: ", url)
  return (
    <Link to = {url}
          
         className='card'>
        <div className='card-header'>
          <div className='question-counter' title='Question Count'>
            {/* {props.questionCount} */}
            4
          </div>
        <h2 className='card-header-h2 clickable-light'>{props.courseCode}</h2>
        </div>
      <h3 className='card-subtext clickable-dark'>{props.courseName}</h3>
      </Link >
  )
}

export default CourseCard