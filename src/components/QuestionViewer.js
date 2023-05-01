import React, { useState } from 'react'
import './styles/QuestionViewer.css'

function QuestionViewer(props) {
  const [isFlagPressed, setIsFlagPressed] = useState(false);
  const [userPressedFlag, setUserPressedFlag] = useState(true);

  const toggleDropdown = () => {
    setIsFlagPressed(!isFlagPressed);
  }
  const link = props.pdfFile.split('?')[0].replace('view', 'preview')
  console.log("link", link)

  return (
    <div className='question-container' >
      <iframe className='question' src={link} allow="autoplay"></iframe>
      <div className={`flag-btn ${userPressedFlag ? 'flagged' : 'dark'}`} onClick={toggleDropdown}> 
        Flag
      </div>
      {
        isFlagPressed ? 
          <div className='flag-dropdown-container'>
            <div className='flag-dropdown-list'>
              <div className='flag-dropdown-option'>Flag as blurry</div>
              <div className='flag-dropdown-option'>Flag as incorrect</div>
            </div>
        </div>
        
        : <> </>
      }
    </div>
    
  )
}

export default QuestionViewer