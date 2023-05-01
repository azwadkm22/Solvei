import React, { useState } from 'react'
import Reply from '../components/Reply'
import QuestionViewer from '../components/QuestionViewer'
import "../components/styles/Button.css"
import "./styles/Question.css"
import { useLocation } from 'react-router-dom'
import RichTextEditor from '../components/RichTextEditor'

function Question() {  

    const [isQuillExpanded , setIsQuillExpanded] = useState(true);

    const handleRTEExpansion = () => {
        setIsQuillExpanded(!isQuillExpanded)
    }
    const location = useLocation();
    const props = location.state?.parameter;
    console.log(props)
  return (
    <div>
        <div className='main-content'>
              <header className='question-body-header'>
                  <div className='first-line'>
                      <h3>{props.courseCode}</h3>
                      <div className='btn big dark'>{props.batch}</div>
                      <div className='btn big dark'>{props.examType}</div>
                  </div>
              </header>

            <div>
                <QuestionViewer pdfFile={props.pdfFile}/>

                { isQuillExpanded ? 
                    <div> 
                        < RichTextEditor />
                        <div className='add-solution-btn small-btn dark' onClick={handleRTEExpansion}>
                        Submit
                        </div>
                    </div>
                :
                      <div className='add-solution-btn dark' onClick={handleRTEExpansion}>
                          Submit a solution
                      </div>
                    
                }
                

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
            <div className='card side-card'>
                <div className='card-header'>
                    <h2>Teacher Name</h2>
                </div>
                <h3 className='card-subtext'>{props.teacher}</h3>
            </div>
              <div className='card side-card'>
                  <div className='card-header'>
                      <h2>Topics</h2>
                  </div>

                <ul className='topic-list'>
                    {props.topics.map((topic, index) => (
                        <li id={index}>{topic}</li>
                    ))}
                </ul>
            </div>

              <div className='card side-card'>
                <div className='card-header'>
                    <h2>Flags</h2>
                </div>
                <table className='flag-table'>
                    <tr className='flag-table-row'>
                        <td className='flag-table-data'>Blurry</td>
                          <td className='flag-table-data'>0</td>
                    </tr >
                      <tr className='flag-table-row'>
                          <td className='flag-table-data'>Blurry</td>
                          <td className='flag-table-data'>0</td>
                      </tr>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Question