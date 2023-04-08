import React from 'react'
import FoldableContainer from '../components/FoldableContainer'
import SideMenu from '../components/SideMenu'
import Activity from '../components/Activity'
function Home() {
  return (
    <div>
        <FoldableContainer semester="1st Year 1st Semester" />
        <SideMenu title="Semester Top Contributors" content="Azwad"/>
        <FoldableContainer semester="1st Year 2nd Semester" />
        <SideMenu title="Recent Activity" content={<Activity />} />
    </div>
  )
}

export default Home