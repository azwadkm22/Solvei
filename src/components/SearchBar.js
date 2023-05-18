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

    const [teachersList, setTeachersList] = useState('');


    const [isFieldFocused, setIsFieldFocused] = useState(false);

    const handleFieldFocus = () => {
        setIsFieldFocused(true);
    }

    const getTeachers = () => {
        return teachersList.map((t, index) => (
            <option key={index} value={t} />
        ))
    };

    const handleFieldBlur = () => {
        setIsFieldFocused(false);
    }




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
        Axios.get(API_BASE_URL + 'teachers/all')
            .then((response) => {
                setTeachersList(response.data)
            })
            .catch((error) => {
                console.log(error)
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

    const clearAll = ()=>{
        setCourse("")
        setBatch("")
        setYearSemester("")
        setTeacher("")
        setExamType("")
        setQueryType("")
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmit(false)
        
        var params = ""
        // console.log(course.length, batch.length, yearSemester.length, teacher.length, examType.length)
        if(course.length > 0) {
            // console.log("in course")
            params += (params.length > 0?'&':"") + 'course=' + course.replaceAll(' ', "%20")
        }

        if(batch.length > 0) {
            // console.log("in batch")
            params += (params.length > 0?'&':"") + 'batch='+ batch
        }

        if(yearSemester.length > 0) {
            // console.log("in year semester ", yearSemester[0], yearSemester[9])
            params += (params.length > 0?'&':"") + 'yearSemester=' + yearSemester[0] + yearSemester[9]
        }

        if(teacher.length > 0) {
            // console.log("in teacher")
            params += (params.length > 0?'&':"") + 'teacher=' + teacher.replaceAll(' ', "%20")
        }

        if(examType.length > 0) {
            // console.log("in exam type")
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
        // console.log("params:", params, "_getReq:", getReq)

        Axios.get(API_BASE_URL + getReq + params)
          .then((response) => {
            // console.log(response.data)
            setSubmit(true) // before navigation
            setExpanded(false)
            goToResult(response.data)
            clearAll()
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
                    <div className={isFieldFocused ? 'search-btn-element form-focused' : 'search-btn-element'}> Search</div>
                </div>
            </div>

                {expanded && (
                    <div className='search-form-container'> 
                        <form className="search-bar-form" onSubmit={handleSubmit}>
                            <label className='search-form-element'> Course:
                            <input type="text" name="course-code" list="course-code-list" placeholder="e.g. CSE-1234" onFocus={handleFieldFocus} onBlur={handleFieldBlur} onChange={handleCourse}/>
                                <datalist id="course-code-list">
                                    {getCourseOptions()}
                                </datalist>
                            </label>
                           <label className='search-form-element'>
                            Batch:
                            <input type="number" name="batch" placeholder="e.g. 25" onChange={handleBatch} onFocus={handleFieldFocus} onBlur={handleFieldBlur} value={batch}/>
                           </label>
                            <label className='search-form-element'> 
                                Year and Semester:
                            <input name="year-and-semester" type="text" list="year-and-semester-options" placeholder="Select an option" value={yearSemester} onFocus={handleFieldFocus} onBlur={handleFieldBlur} onChange={handleYearSemester}/>
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
                            <input name="teacher-name" type="text" list="available-teachers" placeholder="Type or select an option" onFocus={handleFieldFocus} onBlur={handleFieldBlur} onChange={handleTeacher}/>
                                <datalist id="available-teachers">
                                    {getTeachers()} 
                                </datalist>
                                
                            </label>
                            <div className="radio-button-container search-form-element" >
                                <label>
                                <input type="radio" name="course-question" value="course" onFocus={handleFieldFocus} onBlur={handleFieldBlur} onChange={handleQueryType} checked={queryType==='course'}/>
                                    Course
                                </label>
                                <label>
                                <input type="radio" name="course-question" value="question" onFocus={handleFieldFocus} onBlur={handleFieldBlur} onChange={handleQueryType} checked={queryType==='question'}/>
                                    Question
                                </label>
                            </div>
                            <div className="radio-button-container search-form-element" >
                                <label>
                                <input type="radio" name="incourse-final" value="Incourse" onFocus={handleFieldFocus} onBlur={handleFieldBlur} onChange ={handleExamType} checked={examType==='Incourse'}/>
                                    Incourse
                                </label>
                                <label>
                                <input type="radio" name="incourse-final" value="Final" onFocus={handleFieldFocus} onBlur={handleFieldBlur} onChange ={handleExamType} checked={examType==='Final'}/>
                                    Final
                                </label>
                            </div>
                            <button className='search-submit-btn' type="submit" disabled={!submitEnable}>Search</button>
                        </form>
                    </div>
                )}
            
        </div>
    )
}

export default SearchBar