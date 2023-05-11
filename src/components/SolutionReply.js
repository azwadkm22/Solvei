import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function SolutionReply(props) {
const replyText = props.replyText;  
// console.log("props reply",props.reply)
    return (
        <div className='solution-reply'>
            <div dangerouslySetInnerHTML={{ __html: (replyText) }} />
            <div>-{<Link to={'/profile/'+props.reply.postedBy}>{props.reply.postedBy}</Link>}</div>
        </div>
    )
}

export default SolutionReply