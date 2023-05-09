import React, { useState } from 'react'

function SolutionReply(props) {
const [userReplying, setUserReplying] = useState(false);
const replyText = useState(props.replyText)
  return (
    <div dangerouslySetInnerHTML={{__html:replyText}}/>
  )
}

export default SolutionReply