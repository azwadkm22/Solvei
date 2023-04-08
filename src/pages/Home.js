import React from 'react'
import FoldableContainer from '../components/FoldableContainer'
import SideMenu from '../components/SideMenu'
import Activity from '../components/Activity'
import './styles/Home.css'
function Home() {
  return (
    <div>
        <div className='main-content'>

        <FoldableContainer semester="1st Year 1st Semester" />
        <FoldableContainer semester="1st Year 2nd Semester" />
        </div>
        <div className='side-content'>
        <SideMenu title="Semester Top Contributors" content="Azwad" />

        <SideMenu title="Recent Activity" content={<Activity />} />
        </div>
        
    </div>
  )
}

export default Home