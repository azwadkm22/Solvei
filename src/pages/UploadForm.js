import React, { useState } from 'react';
import "./styles/UploadForm.css"
import FileDrop from '../components/FileDrop';
import { useAuthContext } from '../hook/useAuthContext';
import { API_BASE_URL } from '../utils/constants';

const UploadForm = () => {
    const [courseCode, setCourseCode] = useState('');
    const [batch, setBatch] = useState('');
    const [examType, setExamType] = useState('');
    const [teacher, setTeacher] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [topics, setTopics] = useState([]);
    const [numOfQuestions, setNumOfQuestions] = useState(6);
    const {user} = useAuthContext();

    const handleCourseCodeChange = (e) => {
        setCourseCode(e.target.value);
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

    const handleTopicsChange = (e) => {
        setTopics(e.target.value.split(','));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Submit form data to server or perform other actions
        // based on the form data
        const formData = new FormData();

        formData.append("postedBy", user.email)
        console.log("user.email: ", user.email)
        formData.append("courseCode", courseCode)
        formData.append("batch", batch)
        formData.append("examType", examType)
        formData.append("teacher", teacher)
        formData.append("numOfQuestions", numOfQuestions)
        formData.append("topics", topics)
        
        formData.append("pdfFile", pdfFile, pdfFile.name)

        // console.log("form data: ", formData.getAll("postedBy"))
        console.log("do i fail here?")
        console.log("numOfQuestions: ", formData.getAll("numOfQuestions") )

        const response = await fetch(API_BASE_URL + 'question/post', {
            method: 'POST',
            body: formData,
        });
      
        if (response.ok) {
            console.log('Question posted successfully');
            
        } else {
            console.error('Could not post question', response.status);
        }
    };
    

    return (
        <div className='question-form-container'>
            <form onSubmit={handleSubmit} encType='multipart/form-data' className='question-form'>
                <label className='question-form-content'>
                    Course Code:
                    <input
                        className='question-form-box'
                        type="text"
                        value={courseCode}
                        onChange={handleCourseCodeChange}
                        required
                    />
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
                
                 {/* question-form-content'> */}
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
                            required
                        />Final
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
                    Topics (separated by comma):
                    <input
                        className='question-form-box'
                        type="text"
                        value={topics.join(',')}
                        onChange={handleTopicsChange}
                        required
                    />
                </label>
                <button type="submit" className='submit-button'>Submit</button>
            </form>
        </div>
    );
};

export default UploadForm;