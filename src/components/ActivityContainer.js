import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export function ActivityContainer(props) {
    const navigate = useNavigate();
    const [isActivityMinimized, toggleActivityView] = useState(false);
    const getActivities = () => {
        // console.log(props.activityList)
        const activityDescriptionList = props.activityList.map((activity) => activity.description);
        // console.log(activityDescriptionList);
        return props.activityList.map((activity, index) => (
            <div className='profile-activity' key={index} 
                onClick={() => {
                    const url = "/question/" + activity.courseCode + '/' + activity.courseName + '/' + activity.batch + '/' + activity.examType + '/' + activity.questionId;
                    navigate(url);
                }}
            >
                {`${props.userName} ${activity.description}`}
            </div>
        ));
    };
    return (
        <div className='activity-container'>
            <div className='activity-header' onClick={() => toggleActivityView(!isActivityMinimized)}>
                {props.title}
            </div>
            {isActivityMinimized ? 
            <></>
            :

            <div className='activity-list-container'>
                {getActivities()}
            </div>}
        </div>
    )
}


export function StarredListContainer(props) {
    const [isStarredMinimized, toggleStarredView] = useState(false);
    const navigate = useNavigate();
    const getStarredList = () => {
        // console.log(props.starredList)
        return props.starredList.map((starredPost, index) => (
            <div className='profile-activity' key={index} 
            onClick={ () => {
                const url = "/question/" + starredPost.courseCode + '/' + starredPost.courseName + '/' + starredPost.batch + '/' + starredPost.examType + '/' + starredPost.questionId;
                navigate(url);
            }}
            
            >
                {`Batch ${starredPost.batch} ${starredPost.examType} Question, ${starredPost.courseCode}: ${starredPost.courseName}.`}
            </div>
        ));
    };
    return (
        <div className='activity-container'>
            <div className='activity-header' onClick={() => toggleStarredView(!isStarredMinimized)}>
                {props.title}
            </div>
            {isStarredMinimized ?
                <></>
                :
            <div className='activity-list-container'>
                {getStarredList()}
            </div>}
        </div>
    )
}

export function GlobalActivityContainer(props) {
    const navigate = useNavigate();
    const getGlobalActivityList = () => {


        const activityOfUser = props.globalActivity.map(
            (activity) => activity.name + " " + activity.recentActivity.description
        );
        // console.log(activityOfUser)
        return props.globalActivity.map((activity, index) => (
            <div className='profile-activity' id='home-activity' key={index}
                onClick={() => {
                    const url = "/question/" + activity.recentActivity.courseCode + '/' + activity.recentActivity.courseName + '/' + activity.recentActivity.batch + '/' + activity.recentActivity.examType + '/' + activity.recentActivity.questionId;
                    navigate(url);
                }}

            >
                {`${activity.name} ${activity.recentActivity.description}`}
            </div>
        ));
    };
    return (
        <div className='activity-container'>
            <div className='activity-list-container' id='home-activity-container'>
                {getGlobalActivityList()}
            </div>
        </div>
    )
}