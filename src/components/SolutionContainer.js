import React, { useState } from 'react'
import Reply from './Reply'
import RichTextEditor from './RichTextEditor';

function SolutionContainer() {

    const [isReplying, setIsReplying] = useState(false);

    const handleReply = () => {
        console.log("kore felo kemon?")
    };

    const handleReplyBtnPress = () => {
        setIsReplying(!isReplying);
    };

    

    return (
        <div>
            <Reply className="main-reply" vote={15} isSolution={true} />
            
            <div title="Hide" className= {`reply-btn dark ${isReplying ? "hide-btn" : ""}` } onClick={handleReplyBtnPress}> 
                {isReplying ? ">" : "Reply"}  
            </div>
            <div className="reply-container">
                {isReplying ? 
                <div> 

                        <RichTextEditor /> 
                    <div className='add-solution-btn small-btn dark' onClick={handleReply}>
                                  Submit
                              </div>
                </div>
                
                : 
                <></>
                
                }
                <Reply vote={10} isSolution={false} />
                <Reply vote={11} isSolution={false} />
            </div>
        </div>
    )
}

export default SolutionContainer