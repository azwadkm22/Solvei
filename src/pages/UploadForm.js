import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/UploadForm.css"
import FileDrop from '../components/FileDrop';
import { useAuthContext } from '../hook/useAuthContext';
import { API_BASE_URL, HOME } from '../utils/constants';
import { type } from '@testing-library/user-event/dist/type';
import Axios from 'axios'

const UploadForm = () => {
    const navigate = useNavigate();
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [batch, setBatch] = useState('');
    const [examType, setExamType] = useState('');
    const [teacher, setTeacher] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [topics, setTopics] = useState([]);
    const [numOfQuestions, setNumOfQuestions] = useState(0);
    const {user} = useAuthContext();

    const [courses, setCourses] = useState([])

    useEffect(() => {
        Axios.get(API_BASE_URL + HOME + "all")
            .then((response) => {
                setCourses(response.data.courses)
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    const getCodes = () => {
        return courses.map((course, index) => (
            <option key={index} value={course.courseCode} />
        ))
    };

    const getNames = () => {
        return courses.map((course, index) => (
            <option key={index} value={course.courseName} />
        ))
    };

    const handleCourseCodeChange = (e) => {
        setCourseCode(e.target.value);
    };

    const handleCourseNameChange = (e) => {
        setCourseName(e.target.value);
    };

    const handleBatchChange = (e) => {
        setBatch(e.target.value);
    };

    const handleExamTypeChange = (e) => {
        setExamType(e.target.value);
    };

    const handleTeacherChange = (e) => {
        setTeacher(e.target.value);
    };

    const handlePdfFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handleNumOfQuestionsChange = (e) => {
        setNumOfQuestions(e.target.value)
    };

    const handleTopicsChange = (index, event) => {
        const newFields = [...topics];
        newFields[index] = event.target.value;
        setTopics(newFields);
    };

    const goToQuestionPage = (question) => {
        navigate("/question", { state: { parameter: question } });
    };

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("in handle submit")
        
        // Submit form data to server or perform other actions
        // based on the form data
        const formData = new FormData();

        const newTopicList = topics.filter(item => item.length>0)
        console.log(newTopicList)
console.log("upload form: ", courseCode, courseName)
        formData.append("postedBy", user.email)
        formData.append("courseCode", courseCode)
        formData.append("courseName", courseName)
        formData.append("batch", batch)
        formData.append("examType", examType)
        formData.append("teacher", teacher)
        formData.append("numOfQuestions", numOfQuestions)
        formData.append("topics", newTopicList)
        formData.append("pdfFile", pdfFile, pdfFile.name)
        console.log(formData)


        const response = await fetch(API_BASE_URL + 'question/post', {
            method: 'POST',
            body: formData,
        });
      
        if (response.ok) {
            response.json().then(data => {
                console.log('Question posted successfully');
                goToQuestionPage(data);
            })            
        } else {
            console.error('Could not post question', response.status);
            alert("Could not post question")
        }
    };

    const addTopic = () => {
        setTopics([...topics, '']);
    };

    const removeTopic = () => {
        if (topics.length > 0) {
            setTopics(topics.slice(0, -1));
        }
    };

    return (
        <div className='question-form-container'>
            <form onSubmit={handleSubmit} encType='multipart/form-data' className='question-form'>
                <label className='question-form-content'>
                    Course Code:
                    <input
                    list='course-code-list'
                        className='question-form-box'
                        type="text"
                        value={courseCode}
                        onChange={handleCourseCodeChange}
                        required
                    />

                    <datalist id="course-code-list">
                        {getCodes()}
                    </datalist>
                </label >

                <label className='question-form-content'>
                    Course Name:
                    <input
                        list='courses-list'
                        className='question-form-box'
                        type="text"
                        value={courseName}
                        onChange={handleCourseNameChange}
                        required
                    />
                    <datalist id="courses-list">
                        {getNames()}
                    </datalist>
                </label >
                
                <label className = 'question-form-content'>
                    Batch:
                    <input
                        className='question-form-box'
                        type="number"
                        value={batch}
                        onChange={handleBatchChange}
                        required
                    />
                </label>
                

                    <label>Exam Type:</label>
                        <div className='radio-container'>
                            <label className="custom-radio">
                                <input
                                    type="radio"
                                    name="examType"
                                    value="Incourse"
                                    checked={examType === 'Incourse'}
                                    onChange={() => setExamType('Incourse')}
                                    required
                                />Incourse
                            </label>
                            <label className="custom-radio">
                                <input
                                    type="radio"
                                    name="examType"
                                    value="Final"
                                    checked={examType === 'Final'}
                                    onChange={() => setExamType('Final')}
                                    required/>Final
                            </label>
                        </div>
                <label className='question-form-content'>
                    Teacher:
                    <input
                        className='question-form-box'
                        type="text"
                        value={teacher}
                        onChange={handleTeacherChange}
                        required
                    />
                </label>
                <label className='question-form-content'>
                    Question PDF:
                    {/* <FileDrop /> */}
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfFileChange}
                        required
                    />
                </label>
                <label className='question-form-content'>
                    Number of Questions in Exam:
                    <input
                        className='question-form-box'
                        type="number"
                        value={numOfQuestions}
                        onChange={handleNumOfQuestionsChange}
                        required
                    />
                </label>
                <label className='question-form-content'>
                    <div className='mobile-empty-space'></div>
                    Topics:
                    <div className='mobile-empty-space'></div>
                    <div className='tt'>
                    {
                        topics.length == 0 ?
                        <div> No topics added.</div>
                        
                        :
                        
                        topics.map((topic, index) => (
                            <div key={index}>
                                <input className='question-form-box topic-box' type="text" value={topic} onChange={event => handleTopicsChange(index, event)} />
                            </div>
                        ))
                            
                    }
                    
                    </div>
                    
                    <div className='topic-btn-container'>
                        <div title="Add Topic" className='add-topic-btn' onClick={addTopic}> + </div>
                        <div title="Remove Topic" className='remove-topic-btn' onClick={removeTopic}> - </div>
                    </div>
                    
                </label>
                <button type="submit" className='submit-button'>Submit</button>
            </form>
        </div>
    );
};

export default UploadForm;