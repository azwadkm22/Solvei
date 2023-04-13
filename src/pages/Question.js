import React from 'react'
import Reply from '../components/Reply'
import QuestionViewer from '../components/QuestionViewer'
import "../components/styles/Button.css"
import "./styles/Question.css"

function Question(props) {  
  return (
    <div>
        <div className='main-content'>
              <header className='question-body-header'>
                  <div className='first-line'>
                      <h3>{props.course}</h3>
                      <div className='btn big dark'>{props.batch}</div>
                      <div className='btn big dark'>{props.examType}</div>
                  </div>
              </header>

            <div>
                <QuestionViewer />
                <div className='add-solution-btn dark'>
                    Submit a solution 
                </div>
                <div className='solution-container'>
                      <Reply className="main-reply" vote={15} isSolution={true} />
                      <div className='reply-btn dark'> Reply </div>
                    <div className="reply-container">
                    <Reply vote={10} isSolution={false} />
                    <Reply vote={11} isSolution={false} />
                    </div>
                </div>

                <div className='solution-container'>
                    <Reply className="main-reply" vote={15} isSolution={true} />
                    <div className='reply-btn dark'> Reply </div>
                    <div className="reply-container">
                        <Reply vote={10} isSolution={false} />
                        <Reply vote={11} isSolution={false} />
                    </div>
                </div>
                
            </div>
        </div>

        <div className='side-content'>
            <div className='card teacher-card'>
                <div className='card-header'>
                    <h2>Teacher Name</h2>
                </div>
                <h3 className='card-subtext'>John Doe</h3>
            </div>
            <div className='card topics'>
                  <div className='card-header'>
                      <h2>Topics</h2>
                  </div>
                <ul className='topic-list'>
                    <li>A* Algorithm</li>
                    <li>CSP</li>
                    <li>MDP</li>
                    <li>POMDP</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Question