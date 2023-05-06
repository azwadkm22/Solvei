import React, { useState, useEffect } from 'react'
import FoldableContainer from '../components/FoldableContainer'
import SideMenu from '../components/SideMenu'
import Activity from '../components/Activity'
import Axios from 'axios';
import './styles/Home.css'
import { API_BASE_URL, HOME } from '../utils/constants';

function Home() {
    const [allCourses, setAllCourses] = useState([]);
    const [gotResponse, setGotResponse] = useState(false);


    
    useEffect(() => {
        // Fetch all courses from the backend when the component mounts
        Axios.get(API_BASE_URL + HOME)
          .then((response) => {
            // console.log(response.data.courses)
            // console.log(gotResponse)
            setGotResponse(true);
            setAllCourses(response.data.courses);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    
    // Define the criteria for filtering the courses
    const filterCourses = (semester) => {
        const filteredCourses = allCourses.filter((course) => {
            return String(course.courseCode).includes(semester);
        });
        // console.log("semester: ", semester, "filteredCourses:", filteredCourses);
        return filteredCourses;
    };

    return (
        
        <div>
            <div className='main-content'>
                <FoldableContainer semester='1st Year 1st Semester' courses={filterCourses('-11')} isLoading={!gotResponse} />
                <FoldableContainer semester='1st Year 2nd Semester' courses={filterCourses('-12')} isLoading={!gotResponse} />
                <FoldableContainer semester='2nd Year 1st Semester' courses={filterCourses('-21')} isLoading={!gotResponse} />
                <FoldableContainer semester='2nd Year 2nd Semester' courses={filterCourses('-22')} isLoading={!gotResponse} />
                <FoldableContainer semester='3rd Year 1st Semester' courses={filterCourses('-31')} isLoading={!gotResponse} />
                <FoldableContainer semester='3rd Year 2nd Semester' courses={filterCourses('-32')} isLoading={!gotResponse} />
                <FoldableContainer semester='4th Year 1st Semester' courses={filterCourses('-41')} isLoading={!gotResponse} />
                <FoldableContainer semester='4th Year 2nd Semester' courses={filterCourses('-42')} isLoading={!gotResponse} />
            </div>
            
            <div className='side-content'>
            <SideMenu title="Semester Top Contributors" content="Azwad" />

            <SideMenu title="Recent Activity" content={<Activity />} />
            </div>
            
        </div>
    )
}

export default Home