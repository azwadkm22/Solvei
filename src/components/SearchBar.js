import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import "./styles/SearchBar.css";
import Axios from 'axios';
import { API_BASE_URL, HOME, position, QUESTION_SEARCH, COURSE_SEARCH } from '../utils/constants';

function SearchBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);  
    const [allCourses, setAllCourses] = useState([]);
    const [course, setCourse] = useState("");
    const [batch, setBatch] = useState("");
    const [yearSemester, setYearSemester] = useState("");
    const [teacher, setTeacher] = useState("");
    const [examType, setExamType] = useState("");
    const [queryType, setQueryType] = useState("");
    const [submitEnable, setSubmit] = useState(true);


    useEffect(() => {
        // Fetch all courses from the backend when the component mounts
        Axios.get(API_BASE_URL + HOME)
          .then((response) => {
            // console.log(response.data.courses)
            setAllCourses(response.data.courses);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    // for setting teachers
    // useEffect(() )
    const goToResult = (result) => {
        const typeQuestion = (queryType === 'question')
        navigate('/result', {
            state: {
                parameter: result,
                typeQuestion: typeQuestion
            }
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmit(false)
        
        var params = ""
        console.log(course.length, batch.length, yearSemester.length, teacher.length, examType.length)
        if(course.length > 0) {
            console.log("in course")
            params += (params.length > 0?'&':"") + 'course=' + course.replaceAll(' ', "%20")
        }

        if(batch.length > 0) {
            console.log("in batch")
            params += (params.length > 0?'&':"") + 'batch='+ batch
        }

        if(yearSemester.length > 0) {
            console.log("in year semester ", yearSemester[0], yearSemester[9])
            params += (params.length > 0?'&':"") + 'yearSemester=' + yearSemester[0] + yearSemester[9]
        }

        if(teacher.length > 0) {
            console.log("in teacher")
            params += (params.length > 0?'&':"") + 'teacher=' + teacher.replaceAll(' ', "%20")
        }

        if(examType.length > 0) {
            console.log("in exam type")
            params += (params.length > 0?'&':"") + 'examType=' + examType
        }
        

        let getReq
        if(queryType.length > 0) {
            if(queryType==='question') {
                getReq = QUESTION_SEARCH
            } else {
                getReq = COURSE_SEARCH
            }
        } else {
            getReq = QUESTION_SEARCH
        }
        console.log("params:", params, "_getReq:", getReq)

        Axios.get(API_BASE_URL + getReq + params)
          .then((response) => {
            console.log(response.data)
            setSubmit(true) // before navigation
            goToResult(response.data)
          })
          .catch((error) => {
            console.log(error);
          });


        
        
        
    };

    const getCourseOptions = ()=> {
        return allCourses.map((course, index) => (
            <option key={index} value={course.courseCode + ": " + course.courseName}></option>
        ));
    };

    const handleCourse = (e)=> {
        setCourse( e.target.value );
        const temp = String(e.target.value);
        if (temp.includes('-', 0)) {
            const code = String(temp.split('-')[1]);
            const yearSemester = position[(code[0]) - '0'] + " Year " + position[(code[1]) - '0'] + " Semester";
            setYearSemester(yearSemester)
        }
    }

    const handleBatch = (e) => {
        var b = e.target.value
        console.log("raw b:", b)

        if( String(e.target.value).includes('-', 0) || String(e.target.value).includes('.', 0)) {
            console.log("minus or . found")
            setBatch("")
        }
        if(b > 0 && b % 1 === 0) {
            setBatch(b)
        } else {
            setBatch("")
        }
    }

    const handleYearSemester = (e) => {
        setYearSemester(e.target.value)
    }

    const handleQueryType = (e) => {
        setQueryType(e.target.value)
        console.log("query type:", e.target.value)
    }

    const handleTeacher = (e) => {
        setTeacher(e.target.value)
    }

    const handleExamType = (e) => {
        setExamType(e.target.value)
        console.log(e.target.value)
    }
    
    return (

        <div className='searchbar-container'> 
            <div className='searchbar-header'>
                <div className='search-btn' onClick={() => setExpanded(!expanded)}>
                <div className='search-btn-element'> Search </div>
                <div className='search-btn-element'>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.2111 23L13.1611 14.95C12.5222 15.4611 11.7875 15.8657 10.9569 16.1639C10.1264 16.462 9.24259 16.6111 8.30556 16.6111C5.98426 16.6111 4.01989 15.807 2.41244 14.1987C0.805 12.5904 0.000851852 10.626 0 8.30556C0 5.98426 0.804148 4.01989 2.41244 2.41244C4.02074 0.805 5.98511 0.000851852 8.30556 0C10.6269 0 12.5912 0.804148 14.1987 2.41244C15.8061 4.02074 16.6103 5.98511 16.6111 8.30556C16.6111 9.24259 16.462 10.1264 16.1639 10.9569C15.8657 11.7875 15.4611 12.5222 14.95 13.1611L23 21.2111L21.2111 23ZM8.30556 14.0556C9.90278 14.0556 11.2606 13.4963 12.3791 12.3778C13.4976 11.2594 14.0564 9.90193 14.0556 8.30556C14.0556 6.70833 13.4963 5.35048 12.3778 4.232C11.2594 3.11352 9.90193 2.5547 8.30556 2.55556C6.70833 2.55556 5.35048 3.1148 4.232 4.23328C3.11352 5.35176 2.5547 6.70919 2.55556 8.30556C2.55556 9.90278 3.1148 11.2606 4.23328 12.3791C5.35176 13.4976 6.70919 14.0564 8.30556 14.0556Z" fill="#EFEFEF" />
                    </svg>
                </div>
                </div>
            </div>

                {expanded && (
                    <div className='search-form-container'> 
                        <form onSubmit={handleSubmit}>
                            <label className='search-form-element'> Course:
                            <input type="text" name="course-code" list="course-code-list" placeholder="e.g. CSE-1234" onChange={handleCourse}/>
                                <datalist id="course-code-list">
                                    {getCourseOptions()}
                                </datalist>
                            </label>
                           <label className='search-form-element'>
                            Batch:
                                <input type="number" name="batch" placeholder="e.g. 25" onChange={handleBatch} value={batch}/>
                           </label>
                            <label className='search-form-element'> 
                                Year and Semester:
                                <input name="year-and-semester" type="text" list="year-and-semester-options" placeholder="Select an option" value={yearSemester} onChange={handleYearSemester}/>
                                <datalist id="year-and-semester-options">
                                    <option value="1st Year 1st Semester" />
                                    <option value="1st Year 2nd Semester" />
                                    <option value="2nd Year 1st Semester" />
                                    <option value="2nd Year 2nd Semester" />
                                    <option value="3rd Year 1st Semester" />
                                    <option value="3rd Year 2nd Semester" />
                                    <option value="4th Year 1st Semester" />
                                    <option value="4th Year 2nd Semester" />
                                </datalist>
                            </label>
                            <label className='search-form-element'>
                                Teacher:
                                <input name="teacher-name" type="text" list="available-teachers" placeholder="Type or select an option" onChange={handleTeacher}/>
                                <datalist id="available-teachers">
                                    <option value="Asif Hossain Khan" />
                                    <option value="Abu Ahmed Ferdaus" />
                                    <option value="Md. Mosaddek Hossain" />
                                    <option value="Hasnain Heickal" />
                                </datalist>
                                
                            </label>
                            <div className="radio-button-container search-form-element" >
                                <label>
                                    <input type="radio" name="course-question" value="course" onChange={handleQueryType} checked={queryType==='course'}/>
                                    Course
                                </label>
                                <label>
                                    <input type="radio" name="course-question" value="question" onChange={handleQueryType} checked={queryType==='question'}/>
                                    Question
                                </label>
                            </div>
                            <div className="radio-button-container search-form-element" >
                                <label>
                                    <input type="radio" name="incourse-final" value="Incourse" onChange ={handleExamType} checked={examType==='Incourse'}/>
                                    Incourse
                                </label>
                                <label>
                                    <input type="radio" name="incourse-final" value="Final" onChange ={handleExamType} checked={examType==='Final'}/>
                                    Final
                                </label>
                            </div>
                            <button className='submit-button' type="submit" disabled={!submitEnable}>Search</button>
                        </form>
                    </div>
                )}
            
        </div>
    )
}

export default SearchBar