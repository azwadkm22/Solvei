import React, { useState, useEffect } from 'react'
import QuestionViewer from '../components/QuestionViewer'
import "../components/styles/Button.css"
import "./styles/Question.css"
import RichTextEditor from '../components/RichTextEditor'
import SolutionContainer from '../components/SolutionContainer'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from '../utils/constants'
import Axios from 'axios'
import { useAuthContext } from '../hook/useAuthContext'
import LoadingBar from '../components/LoadingBar'
import { SwalInfoAlert } from '../components/SwalCustomAlerts'


function Question() {  
    const {user} = useAuthContext()
    // const [renderSolution, setRenderSolution] = useState(false)
    const [solutionStr, setSolutionStr] = useState("")
    const [solutionList, setSolutionList] = useState(null)
    const {courseCode, courseName, batch, examType, id} = useParams();
    // console.log("id from params: ",id)
    const [isQuillExpanded , setIsQuillExpanded] = useState(false);
    const [props, setProps] = useState(null)
    const [pdfFile, setPdfFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    var responseData = [];
    var tryAgain = false;


    var [blurryFlagsCount, updateBlurryFlagsCount] = useState(0)
    var [incorrectFlagsCount, updateIncorrectFlagsCount] = useState(0)


    const updateFlagCount = () => {
        Axios.get(API_BASE_URL + 'question/view?question=' + id)
            .then((response) => {
                updateBlurryFlagsCount(response.data.flagBlurry.length);
                updateIncorrectFlagsCount(response.data.flagIncorrect.length);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        console.log("Ok")
        if(isLoading === false)
        {
            setSolutionList(responseData)
            console.log("AAAAAAAAA", responseData)
        }
        else{
            tryAgain = true;
        }
    }, [])

    useEffect(() => {

    }, [blurryFlagsCount, incorrectFlagsCount])


    useEffect(() => {
        Axios.get(API_BASE_URL + 'solution/get?question='+ id)
            .then((response) => {
                tryAgain = false;
                responseData = response.data;
                setIsLoading(false);
                setSolutionList(Object.values(response.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [tryAgain])


    useEffect(() => {
        Axios.get(API_BASE_URL + 'question/view?question=' + id)
            .then((response) => {
                // console.log("response.data through axios: ", response.data)
                setProps(response.data)
                updateBlurryFlagsCount(response.data.flagBlurry.length);
                updateIncorrectFlagsCount(response.data.flagIncorrect.length);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    

    const handleRTEExpansion = () => {
        if(isQuillExpanded) {
            setPdfFile(null)
        }
        setIsQuillExpanded(!isQuillExpanded)
    }

    const handleSubmit = async () => {
        if(!user) {
            SwalInfoAlert("Log in to submit solution!")
            setIsQuillExpanded(false)
            return
        } else {
            console.log("You can do it.")
            let isPDF
            let hasImage
            const questionID = id
            const postedBy = user?.email
            const formData = new FormData()
            formData.append("postedBy", postedBy)
            formData.append("questionID", questionID)
        
            if(pdfFile !== null) {
                // console.log("in pdfFile !== null")
                isPDF = true
                hasImage = false
                formData.append("isPDF", isPDF)
                formData.append("hasImage", hasImage)
                // console.log("where do i die")
                // console.log(pdfFile, pdfFile.name)
                formData.append("pdfFile", pdfFile, pdfFile.name)
            
                // console.log("pdfFile",formData.get("pdfFile"))


            } else {
                hasImage = false
                isPDF = false
                formData.append("isPDF", isPDF)
                formData.append("hasImage", hasImage)
                formData.append("solution", solutionStr)


                // console.log("solution: ",formData.get("solution"))
            }
    
            const response = await fetch(API_BASE_URL + "solution/add", {
                method: 'POST',
                body: formData
            });


            if(response.ok) {
                // console.log(response)
                // console.log(response.text)
                setIsQuillExpanded(false)
                window.location.reload()
            } else {
                console.error(response.status)
                SwalInfoAlert("Could not post solution.")
            }

        }
    }


    const handlePdfFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };


  return (
    props &&
    <div>
        <header className='question-body-header'>
            <div className='first-line'>
                <h3>{props.courseCode + ": " + props.courseName}</h3>

                <div className='question-header-btn-container'>
                    <div className='dark question-page-btn'>{props.batch}</div>
                    <div className='dark question-page-btn'>{props.examType}</div>
                </div>
                
            </div>
        </header>
        <div className='question-page-container'>
            <div className='question-main-content'>
                
                <div>
                    <QuestionViewer pdfFile={props.pdfFile} question={props._id} updateFlags={updateFlagCount}/>

                    <div>
                        {
                        isQuillExpanded ?
                            <div className="rte-container">
                            <div title="Hide" className='reply-btn hide-btn hide-soln-editor-btn dark' onClick={handleRTEExpansion}>
                                {">"}
                            </div>
                            <div className='rich-text-editor'>
                                < RichTextEditor solutionTxtHandler={setSolutionStr} />
                                <div className='add-solution-btn small-btn dark' onClick={handleSubmit}>
                                    Submit
                                </div>
                                <label htmlFor="fileInput" className='add-solution-btn small-btn dark'>
                                    {pdfFile ? pdfFile.name : 'Upload a PDF file Instead?'}
                                    <input
                                        type="file"
                                        id="fileInput"
                                        name="pdfFile"
                                        accept=".pdf"
                                        capture="environment"
                                        style={{ display: 'none' }}
                                        onChange={handlePdfFileChange}
                                    />
                                </label>
                            </div>                            
                        </div>
                        :
                        <div className='rte-container alignment-right'>
                            <div className='add-solution-btn dark' onClick={handleRTEExpansion}>
                                Submit a solution
                            </div>
                        </div>
                        
                        }

                        
                        
                    </div>

                    {
                        isLoading ? 
                        <LoadingBar /> 
                        : 
                        <SolutionContainer solutionList={solutionList} />
                    }
                
                </div>
            </div>


            <div className='question-side-content'>
                <div className='question-page-card question-teacher-card'>
                    <div className='question-page-card-header'>
                        <h2>Teacher Name</h2>
                    </div>
                    <h3 className='question-card-subtext'>{props.teacher}</h3>
                </div>

                <div className='question-page-card topics-card'>
                    <div className='question-page-card-header'>
                        <h2>Topics</h2>
                    </div>


                    <ul className='topic-list'>
                        {props.topics.map((topic, index) => (
                            <li id={index}>{topic}</li>
                        ))}
                    </ul>
                </div>
                

                <div className='question-page-card flags-card'>
                    <div className='question-page-card-header'>
                        <h2>Received Flags</h2>
                    </div>
                <table className='flag-table'>
                    <tr className='flag-table-row'>
                        <td className='flag-table-data'>Blurry</td>
                                  <td className='flag-table-data'>{blurryFlagsCount}</td>
                    </tr >
                        <tr className='flag-table-row'>
                            <td className='flag-table-data'>Incorrect</td>
                                  <td className='flag-table-data'>{incorrectFlagsCount}</td>
                        </tr>
                </table>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Question

