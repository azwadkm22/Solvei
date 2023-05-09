import React, { useState } from 'react'

function SolutionReply(props) {
const replyText = props.replyText;  
    return (
        <div className='solution-reply'>
            <div dangerouslySetInnerHTML={{ __html: (replyText) }} />
        </div>
    )
}

export default SolutionReply