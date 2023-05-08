import React from 'react'

function ActivityContainer(props) {
    const getActivities = () => {
        return props.activityList.map((activity, index) => (
            <div className='profile-activity' key={index}>
                {activity}
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

export default ActivityContainer