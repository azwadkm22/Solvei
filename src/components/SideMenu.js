import React from 'react'
import "./styles/SideMenu.css"
function SideMenu(props) {
  return (
    <div className='sidemenu-container'>
        <div className='sidemenu-header'> 
        <h3 className='sidemenu-header-title'>{props.title}</h3>
        </div>
    
        <div className='sidemenu-content'>
              {props.content}     
        </div>
        
    </div>
  )
}

export default SideMenu