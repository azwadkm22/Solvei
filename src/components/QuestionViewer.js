import React, { useState } from 'react'
import './styles/QuestionViewer.css'
import { SwalErrorAlert, SwalSuccessAlert, SwalInfoAlert, SwalQuestionAlert } from './SwalCustomAlerts';

function QuestionViewer(props) {
  const [isFlagPressed, setIsFlagPressed] = useState(false);
  const [isStarred, setIsStarred] = useState(true);
  const [userPressedFlag, setUserPressedFlag] = useState(false);

  const toggleDropdown = () => {
    setIsFlagPressed(!isFlagPressed);
  }

  const starQuestion = () => {

    isStarred ?
    SwalQuestionAlert("Remove from Starred?", 
    () =>{
      console.log("Accept");
      setIsStarred(false)

      SwalInfoAlert("Question removed from starred.", "")
    },
    () => {
      console.log("Reject");
    })
    
    :
    
    SwalInfoAlert("Question is starred.", "You can view your starred posts in your Profile.")
    
    setIsStarred(true)
    // Write stuff here
    // if(set)
  }
  const link = props.pdfFile.split('?')[0].replace('view', 'preview')
  console.log("link", link)

  return (
    <div className='question-container' >
      <iframe className='question' src={link} allow="autoplay"></iframe>
      <div className={`star-btn gold-variant`} onClick={starQuestion}>

        {isStarred ? 
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z" fill="#ffe570" />
          </svg>

          : <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.85 17.825L12 15.925L15.15 17.85L14.325 14.25L17.1 11.85L13.45 11.525L12 8.125L10.55 11.5L6.9 11.825L9.675 14.25L8.85 17.825ZM5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z" fill="#efefef" />
        </svg>}
      
      </div>
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