import React , { useEffect, useState } from 'react';
import "./styles/Card.css";
import { Link } from 'react-router-dom';
import Axios from 'axios'
import { API_BASE_URL } from '../utils/constants';

function CourseCard(props) {
  const url = "/course/" + props.courseCode + '/' + props.courseName.replaceAll(' ', "%20")
  console.log("from courseCard url: ", url)
  const [qCount, setCount] = useState(0)

  useEffect(() => {
    const ccUrl = API_BASE_URL + "search/question?course=" + props.courseCode + ':' + props.courseName.replaceAll(' ', '%20') 
    // console.log("url: ", ccUrl)
    Axios.get(ccUrl)
      .then((response) => {
        // console.log("course card response.data: ", response.data.length)
        setCount(response.data.length)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Link to = {url}
          
         className='card'>
        <div className='card-header'>
          <div className='question-counter' title='Question Count'>
            {/* {props.questionCount} */}
            {qCount}
          </div>
        <h2 className='card-header-h2 clickable-light'>{props.courseCode}</h2>
        </div>
      <h3 className='card-subtext clickable-dark'>{props.courseName}</h3>
      </Link >
  )
}

export default CourseCard