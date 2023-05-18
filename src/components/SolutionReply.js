import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { SwalErrorAlert, SwalInfoAlert, SwalQuestionAlert } from './SwalCustomAlerts';
import { useAuthContext } from '../hook/useAuthContext';
import Axios from 'axios'
import { API_BASE_URL } from '../utils/constants';

function SolutionReply(props) {
    const replyText = props.replyText;  
    const { user } = useAuthContext();
    const deleteReply = () => {
        SwalQuestionAlert("Do you want to delete this reply?",
            () => {
                console.log(props.reply._id)
                Axios.delete(API_BASE_URL + "reply/delete/" + props.reply._id)
                    .then(response => {
                        SwalInfoAlert("Reply deleted successfully.")
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    })
                    .catch(error => {
                        SwalErrorAlert("Deletion unsuccessful.")
                    })


            }
            ,
            () => {

                console.log("Rejected")
            })
        console.log(props)
    }
// console.log("props reply",props.reply)
    return (
        <div className='solution-reply'>
            {
                user.email === props.reply.postedBy &&
                <div className='delete-reply-btn' onClick={deleteReply} title='Delete Reply'>
                    <svg viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" className='reply-trash-logo'>
                        <path d="M5 0V1H0V3H1V16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H13C13.5304 18 14.0391 17.7893 14.4142 17.4142C14.7893 17.0391 15 16.5304 15 16V3H16V1H11V0H5ZM3 3H13V16H3V3ZM5 5V14H7V5H5ZM9 5V14H11V5H9Z" fill="#efefef" />
                    </svg>
                </div>
            }
            <div dangerouslySetInnerHTML={{ __html: (replyText) }} />
            <div>-{<Link to={'/profile/'+props.reply.postedBy}>{props.reply.postedBy}</Link>}</div>
        </div>
    )
}

export default SolutionReply