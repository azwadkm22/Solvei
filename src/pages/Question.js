import React, { useState } from 'react'
import Reply from '../components/Reply'
import QuestionViewer from '../components/QuestionViewer'
import "../components/styles/Button.css"
import "./styles/Question.css"
import { useLocation } from 'react-router-dom'
import RichTextEditor from '../components/RichTextEditor'
import SolutionContainer from '../components/SolutionContainer'

function Question() {  

    const [isQuillExpanded , setIsQuillExpanded] = useState(true);

    const handleRTEExpansion = () => {
        setIsQuillExpanded(!isQuillExpanded)
    }

    const [pdfFile, setPdfFile] = useState(null);

    const handleSubmit = () => {
        
        console.log("You can do it.")
    }

    const handlePdfFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };
    
    const location = useLocation();
    const props = location.state?.parameter;
    console.log(props)
  return (
    <div>
        <div className='main-content'>
              <header className='question-body-header'>
                  <div className='first-line'>
                      <h3>{props.courseCode + ": " + props.courseName}</h3>
                      <div className='btn big dark'>{props.batch}</div>
                      <div className='btn big dark'>{props.examType}</div>
                  </div>
              </header>

            <div>
                <QuestionViewer pdfFile={props.pdfFile}/>

                
                <div className='solution-container'>
                      {isQuillExpanded ?
                          <div>
                              < RichTextEditor />
                              <div title="Hide" className='reply-btn hide-btn hide-soln-editor-btn dark' onClick={handleRTEExpansion}>
                                  {">"}
                              </div>

                              <div className='add-solution-btn small-btn dark' onClick={handleSubmit}>
                                  Submit
                              </div>
                                <label htmlFor="fileInput" className='add-solution-btn small-btn dark'>
                                    {pdfFile ? pdfFile.name : 'Upload a PDF file Instead?'} 
                                    <input
                                        type="file"
                                        id="fileInput"
                                        accept="application/pdf"
                                        capture="environment"
                                        style={{ display: 'none'}}
                                        onChange={handlePdfFileChange}
                                    />
                                </label>
                          </div>
                          :
                          <div className='add-solution-btn dark' onClick={handleRTEExpansion}>
                              Submit a solution
                          </div>

                      }

                      <SolutionContainer />
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
                    <h2>Received Flags</h2>
                </div>
                <table className='flag-table'>
                    <tr className='flag-table-row'>
                        <td className='flag-table-data'>Blurry</td>
                          <td className='flag-table-data'>0</td>
                    </tr >
                      <tr className='flag-table-row'>
                          <td className='flag-table-data'>Incorrect</td>
                          <td className='flag-table-data'>0</td>
                      </tr>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Question