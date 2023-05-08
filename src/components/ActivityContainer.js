import React from 'react'
import { useNavigate } from 'react-router-dom';

export function ActivityContainer(props) {
    const navigate = useNavigate();
    const getActivities = () => {
        console.log(props.activityList)
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
            <div className='activity-header'>
                {props.title}
            </div>
            <div className='activity-list-container'>
                {getActivities()}
            </div>
        </div>
    )
}


export function StarredListContainer(props) {
    const navigate = useNavigate();
    const getStarredList = () => {
        console.log(props.starredList)
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
            <div className='activity-header'>
                {props.title}
            </div>
            <div className='activity-list-container'>
                {getStarredList()}
            </div>
        </div>
    )
}