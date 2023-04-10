import React from 'react'
import "./styles/Question.css"
import Solution from '../components/Solution'
import QuestionViewer from '../components/QuestionViewer'

function Question(props) {
  return (
    <div>
        <header>
            <div className='course-code-name'>
                {props.course}
            </div>

            <div className='batch'>{props.batch}</div>
            <div className='exam-type'>{props.examType}</div>
        </header>

        <div className='main-content'>
            <QuestionViewer />
            
            <Solution className="main-solution"/>

            <div className="reply">
                <Solution />
                <Solution />
            </div>
        </div>

        <div className='side-content'>
            <div className='teacher'>
                <h2>Teacher</h2>
                Teacher name
            </div>
            <div className='topics'>
                <h2>Topics</h2>
                <ul className='topic-list'>
                    <li>adsf</li>
                    <li>zxcv</li>
                    <li>qwer</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Question