import React, { useState, useEffect } from 'react';
import "./styles/Profile.css"
import { useLocation } from 'react-router-dom';
import { API_BASE_URL, AUTH, USER } from '../utils/constants';
import  Axios  from 'axios';
import { ActivityContainer, StarredListContainer } from '../components/ActivityContainer';

import LoadingBar from '../components/LoadingBar';

function Profile() {
  const location = useLocation()
  const {email} = location.state
  const [isUser, setIsUser] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  //Nashmin bring stuff here
  // const userInfo = {
  //   "fullName": "K. M. Azwad Hossain",
  //   "batch": 25,
  //   "registrationNumber": "2018-525-331",
  //   "email": email} 

    useEffect(() => {
      // Fetch all courses from the backend when the component mounts
      Axios.get(API_BASE_URL + USER + email)
        .then((response) => {
          console.log(response.data)
          setIsUser(true)
          setUserInfo(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  return (
    <div className='profile-page-container'>
      <div className='user-account-info-container'>

      <div className='user-details-container'>
        <div className='user-img-container'>
          <img id='user-image' src='https://2.gravatar.com/avatar/b5d5383385b2dd615bb34a7114d3f49f?s=512&d=identicon&r=G'/>
        </div>
        {
          isUser ? 
          <div className='user-info-container'>
              <p className='user-info'>{userInfo.name}</p>
              <p className='user-info'>{userInfo.batch}</p>
              <p className='user-info'>{userInfo.registrationNumber}</p>
              <p className='user-info'>{userInfo.email}</p>
              <div className='edit-pass-btn user-info dark'> Edit Password </div>
          </div>

          :

          <div className='user-info-container'>
              <p className='user-info'>{userInfo.name}</p>
              <p className='user-info'>{userInfo.batch}</p>
          </div>
        }   

        </div>
      </div>

      <div className='user-activity-container'>

        {(userInfo.recentActivity === undefined) ?
          <LoadingBar />
          :
          <ActivityContainer title="Recent Activities" activityList={
            userInfo.recentActivity
            // []

          } userName={userInfo.name} />  
        }

        {(userInfo.starred === undefined) ?
          <LoadingBar />
          :
          <StarredListContainer title="Starred Posts" starredList={
            userInfo.starred
            // []

          }/>
        }
              

      </div>
    </div>
  )
}

export default Profile