import React, { useState , useEffect} from 'react'
import './styles/QuestionViewer.css'
import { SwalErrorAlert, SwalSuccessAlert, SwalInfoAlert, SwalQuestionAlert } from './SwalCustomAlerts';
import { useAuthContext } from '../hook/useAuthContext.js'
import { API_BASE_URL, USER } from '../utils/constants';
import Axios from 'axios'

function QuestionViewer(props) {
  const {user} = useAuthContext()
  const questionId = props.question
  const [isFlagPressed, setIsFlagPressed] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [userFlaggedIncorrect, setUserFlaggedIncorrect] = useState(false);
  const [userFlaggedBlurry, setUserFlaggedBlurry] = useState(false);
  const [isStarBtnDisabled, toggleStarBtn] = useState(false);

  const toggleDropdown = () => {
    setIsFlagPressed(!isFlagPressed);
  }

  const removeBlurryFlagPrompt = () => {
    SwalQuestionAlert("Do you want to remove the Blurry Flag?",
      async () => {
        // console.log("Accept");
        await Axios.post(API_BASE_URL + "question/unflag/blurry", {
          "questionId": questionId,
          "email": user?.email
        })
          .then(function (response) {
            setUserFlaggedBlurry(false)
            props.updateFlags();
            SwalInfoAlert("Blurry Flag removed.", "")
          })
          .catch(function (error) {
            SwalErrorAlert(error.message)
          })
      },
      () => { }
    )
  }

  const addBlurryFlagPrompt = () => {
    userFlaggedBlurry === false ? 

    SwalQuestionAlert("Do you want to add the Blurry Flag?",
      async () => {
        // console.log("Accept");
        await Axios.post(API_BASE_URL + "question/flag/blurry", {
          "questionId": questionId,
          "email": user?.email
        })
          .then(function (response) {
            setUserFlaggedBlurry(true)
            props.updateFlags();
            SwalInfoAlert("Blurry Flag added.", "")
          })
          .catch(function (error) {
            SwalErrorAlert(error.message)
          })
      },
      () => { }
    )
    :
    SwalInfoAlert("Already flagged blurry by you.")
  }


  const removeIncorrectFlagPrompt = () => {
    SwalQuestionAlert("Do you want to remove the Incorrect Flag?",
      async () => {
        // console.log("Accept");
        await Axios.post(API_BASE_URL + "question/unflag/incorrect", {
          "questionId": questionId,
          "email": user?.email
        })
          .then(function (response) {
            setUserFlaggedIncorrect(false)
            props.updateFlags();
            SwalInfoAlert("Incorrect Flag removed.", "")
          })
          .catch(function (error) {
            SwalErrorAlert(error.message)
          })
      },
      () => { }
    )
  }

  const addIncorrectFlagPrompt = () => {
    userFlaggedIncorrect === false? 
    SwalQuestionAlert("Do you want to add the Incorrect Flag?",
      async () => {
        // console.log("Accept");
        await Axios.post(API_BASE_URL + "question/flag/incorrect", {
          "questionId": questionId,
          "email": user?.email
        })
          .then(function (response) {
            setUserFlaggedIncorrect(true)
            props.updateFlags();
            SwalInfoAlert("Incorrect Flag added.", "")
          })
          .catch(function (error) {
            SwalErrorAlert(error.message)
          })
      },
      () => { }
    )
    :
    SwalInfoAlert("Already flagged incorrect by you.")
  }

  useEffect(() => {
    // console.log("req", API_BASE_URL + "/question/view?question=" + questionId)
    Axios.get(API_BASE_URL + "question/view?question=" + questionId)
      .then((response) => {
        // console.log(response.data)
        const flaggedBlurryList = response.data.flagBlurry;

        // console.log( "BLURRR ", flaggedBlurryList)
        flaggedBlurryList.forEach(function(item) {
          if (user && user.email === item)
          {
            setUserFlaggedBlurry(true);
          }
        })

        const flaggedIncorrectList = response.data.flagIncorrect;
        flaggedIncorrectList.forEach(function (item) {
          if (user && user.email === item) {
            setUserFlaggedIncorrect(true);
          }
        })

      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  useEffect(() => {

    if(user)
    {
    Axios.get(API_BASE_URL + USER + user?.email)
        .then((response) => {
          const starredList = response.data.starred
          starredList.forEach(function(item) {
            if (item.questionId === questionId) {
              setIsStarred(true)
            }
          });
        })
        .catch((error) => {
          console.log(error);
        })
      };
  }, [isStarred])
  

  const enableStarBtn = (state) => {
    toggleStarBtn(state);
  }
  const starQuestion = () => {
    console.log("Pressed star btn:", isStarBtnDisabled)

    if(isStarBtnDisabled === true)
    {
      return;
    }
    enableStarBtn(true);
    isStarred ?
    
    SwalQuestionAlert("Remove from Starred?", 
    async () =>{
      // console.log("Accept");
      await Axios.post(API_BASE_URL + "user/star/remove", {
        "email": user?.email,
        "questionId": questionId
      })
      .then(function (response) {
        setIsStarred(false)
        SwalInfoAlert("Question removed from starred.", "")
        enableStarBtn(false);
      })
      .catch(function (error) {
        SwalErrorAlert(error.message)
        enableStarBtn(false);
      }) 
    },
    () => {
      console.log("Reject");
      enableStarBtn(false);
    })
    :
    Axios.post(API_BASE_URL + "user/star/add", {
      "email":user?.email,
      "questionId": questionId
    })
    .then(function (response) {
      setIsStarred(true)
      SwalInfoAlert("Question is starred.", "You can view your starred posts in your Profile.")
      enableStarBtn(false);
    })
    .catch(function(error) {
      SwalErrorAlert(error.message)
      enableStarBtn(false);
    })
    
    
    // Write stuff here
    // if(set)
  }
  const link = props.pdfFile.split('?')[0].replace('view', 'preview')
  // console.log("link", link)

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

      <div className='question-flag-container'>
        {userFlaggedBlurry ? 
          <div className='question-flag blurry-flag' onClick={removeBlurryFlagPrompt}>Blurry</div> 
        :
          <></>
        }
        {userFlaggedIncorrect ? 
        <div className='question-flag incorrect-flag' onClick={removeIncorrectFlagPrompt}>Incorrect</div>
        :
        <></>
        }
      </div>
      <div className={`flag-btn dark`} onClick={toggleDropdown}> 
        Flag
      </div>

      {
        isFlagPressed ? 
          <div className='flag-dropdown-container'>
            <div className='flag-dropdown-list'>
              <div className='flag-dropdown-option' onClick={addBlurryFlagPrompt}>Flag as blurry</div>
              <div className='flag-dropdown-option' onClick={addIncorrectFlagPrompt}>Flag as incorrect</div>
            </div>
        </div>
        
        : <> </>
      }
    </div>
    
  )
}

export default QuestionViewer