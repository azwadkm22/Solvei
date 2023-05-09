import React, { useState } from 'react'
import Solution from './Solution'
import RichTextEditor from './RichTextEditor';

function SolutionContainer(props) {
    const [solutions, setSolutionList] = useState(props.solutionList)

    const populateSolutions = ()=> {
        // console.log("inside populate solutions")
        // console.log("inside populate: solutions:",solutions)
        // return result.map((question, index) => (
        //     <QuestionResultCard key={index} question={question} examBatch={question.batch} courseCode={question.courseCode} examType={question.examType} teacherName={question.teacher} />
        //   ));
        const toReturn = solutions.map((sol, index) => (
            <div key={index}>
                
                <Solution className="main-reply" vote={sol.upvotes.length - sol.downvotes.length} isSolution={true} solution={sol}/>
                
                
            </div>
        ))
        // console.log("toreturn: ", toReturn )
        return toReturn;
    }
    

    return <div>{populateSolutions()}</div>
}

export default SolutionContainer