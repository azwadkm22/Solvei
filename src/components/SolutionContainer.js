import React, { useState } from 'react'
import Reply from './Reply'
import RichTextEditor from './RichTextEditor';

function SolutionContainer(props) {
    const [solutions, setSolutionList] = useState(props.solutionList)
    const [isReplying, setIsReplying] = useState(false);

    const handleReply = () => {
        console.log("kore felo kemon?")
    };

    const handleReplyBtnPress = () => {
        setIsReplying(!isReplying);
    };

    const populateSolutions = ()=> {
        // console.log("inside populate solutions")
        // console.log("inside populate: solutions:",solutions)
        // return result.map((question, index) => (
        //     <QuestionResultCard key={index} question={question} examBatch={question.batch} courseCode={question.courseCode} examType={question.examType} teacherName={question.teacher} />
        //   ));
        const toReturn = solutions.map((sol, index) => (
            <div key={index}>
                
                <Reply className="main-reply" vote={15} isSolution={true} solution={sol}/>
                
                <div title="Hide" 
                    className= {`reply-btn dark ${isReplying ? "hide-btn" : ""}` } 
                    onClick={handleReplyBtnPress}> 
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
                    {/* <Reply vote={10} isSolution={false} />
                    <Reply vote={11} isSolution={false} /> */}
                </div>
            </div>
        ))
        // console.log("toreturn: ", toReturn )
        return toReturn;
    }
    

    return <div>{populateSolutions()}</div>
}

export default SolutionContainer