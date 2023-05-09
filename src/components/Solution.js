import React, { useState , useEffect } from "react";
import "./styles/Solution.css"
import { getSuggestedQuery } from "@testing-library/react";
import RichTextEditor from "./RichTextEditor";
import { useAuthContext } from '../hook/useAuthContext';
import { SwalErrorAlert, SwalInfoAlert } from './SwalCustomAlerts'
import { API_BASE_URL } from "../utils/constants";
import Axios from 'axios'
import SolutionReply from "./SolutionReply";

function Solution(props) {
    const {user} = useAuthContext();
    const [voteCount, setVoteCount] = useState(props.vote)
    const [solution, setSolution] = useState(props.solution)
    const [userUpvoted, setUserUpvoted] = useState(props.solution.upvotes.includes(user?.email));
    const [userDownvoted, setUserDownvoted] = useState(props.solution.downvotes.includes(user?.email));
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("")
    const [replies, setReplies] = useState([])
    
    
    useEffect(() => {
        const url = API_BASE_URL + "reply/get?solution=" + solution._id

        Axios.get(url)
            .then((response) => {
                console.log("response data; ", response.data)
                setReplies(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const addUpvote = () => {
        // api / solution / add / upvote
        const url = API_BASE_URL + "solution/add/upvote"

        Axios.post(url, {
            "solutionId": solution._id,
            "email": user?.email
        })
            .then(function (response) {
                // setUserFlaggedBlurry(false)
                // props.updateFlags();
                // SwalInfoAlert("Blurry Flag removed.", "")
            })
            .catch(function (error) {
                SwalErrorAlert(error.message)
            })
    }

    const removeUpvote = () => {
        const url = API_BASE_URL + "solution/remove/upvote"
        
        Axios.post(url, {
            "solutionId": solution._id,
            "email": user?.email
        })
            .then(function (response) {
                // setUserFlaggedBlurry(false)
                // props.updateFlags();
                // SwalInfoAlert("Blurry Flag removed.", "")
            })
            .catch(function (error) {
                SwalErrorAlert(error.message)
            })
    }

    const addDownvote = () => {
        const url = API_BASE_URL + "solution/add/downvote"

        Axios.post(url, {
            "solutionId": solution._id,
            "email": user?.email
        })
            .then(function (response) {
                // setUserFlaggedBlurry(false)
                // props.updateFlags();
                // SwalInfoAlert("Blurry Flag removed.", "")
            })
            .catch(function (error) {
                SwalErrorAlert(error.message)
            })
    }

    const removeDownvote = () => {
        const url = API_BASE_URL + "solution/remove/downvote"

        Axios.post(url, {
            "solutionId": solution._id,
            "email": user?.email
        })
            .then(function (response) {
                // setUserFlaggedBlurry(false)
                // props.updateFlags();
                // SwalInfoAlert("Blurry Flag removed.", "")
            })
            .catch(function (error) {
                SwalErrorAlert(error.message)
            })
    }
    const handleReply = async () => {
        console.log("PRESSED")
        if(!user) {
            SwalInfoAlert("Log in to reply!")
            setIsReplying(false)
            return
        } else {
            if( replyText.length > 11) {
                const postedBy = user?.email
                const solutionId = solution._id
                const questionId = solution.questionID 
                const reply = replyText

                const body = {
                    "postedBy" : postedBy,
                    "solutionId": solutionId,
                    "questionId": questionId, 
                    "reply": reply
                }


                await Axios.post(API_BASE_URL + "reply/add",
                body,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                )
                .then((response) => {
                    setIsReplying(false)
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error)
                    SwalInfoAlert("Could not post reply")
                }) 

            } else {
                return
            }
        }
        
    };

    const handleReplyBtnPress = () => {
        setIsReplying(!isReplying);
    };
    

    console.log("solution: ", solution, " isPDf: ", solution.isPDF)

    function upvote() {
        if (user) {
            if(userUpvoted === true && userDownvoted === false)
            {
                setVoteCount(voteCount-1)
                setUserUpvoted(false);
                removeUpvote();
                //##solution/remove/upvote
            }
            else if (userUpvoted === false && userDownvoted === true) {
                setVoteCount(voteCount + 2);
                setUserUpvoted(true);
                setUserDownvoted(false);
                //##solution/add/upvote
                addUpvote();
                removeDownvote();
                //##solution/remove/downvote
            }
            else 
            {
                setVoteCount(voteCount + 1);
                setUserUpvoted(true);
                setUserDownvoted(false);
                //##solution/add/upvote
                addUpvote();
            }
        }
        else {
            SwalInfoAlert("Please Login First")
        }

        // updateVoteCount()

        // solution/add/upvote


        console.log(userUpvoted)
        
    }

    function downvote() {
        console.log(userDownvoted)

        if (user)
        {
            if (userDownvoted === true && userUpvoted === false) {
                setVoteCount(voteCount + 1)
                setUserDownvoted(false);
                removeDownvote()
            }
            else if (userDownvoted === false && userUpvoted === true) {
                setVoteCount(voteCount - 2);
                setUserUpvoted(false);
                setUserDownvoted(true);
                removeUpvote();
                addDownvote();
            }
            else {
                setVoteCount(voteCount - 1);
                setUserUpvoted(false);
                setUserDownvoted(true);
                addDownvote();
            }
        }
        else{
            SwalInfoAlert("Please Login First")
        }
        

    }
    

    const getLink = ()=> {
        const link = solution.pdfFile?.split('?')[0].replace('view', 'preview')
        // console.log("parsed link: ", link)
        return link
    }

    const getSolutionDisplay = () => {
        if(solution.isPDF === true) {
            return <iframe className='question' src={getLink()} allow="autoplay"/>
        }
        return <div dangerouslySetInnerHTML={{__html:solution.solution}}/>
    }

    const getReplies = () => {
        const toRet = replies.map((res, index) => {
            return <SolutionReply key={index} replyText={res.reply} reply={res}/>
        })
        return toRet
    } 



    return (
        <div className="solution-box">
            <div className="solution-row">
                <div className="solution-votes">
                    <div className="upvote" onClick={upvote}>
                        {
                            userUpvoted ? 
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.00003 14H8.00003V21C8.00003 21.2653 8.10539 21.5196 8.29292 21.7072C8.48046 21.8947 8.73481 22 9.00003 22H15C15.2652 22 15.5196 21.8947 15.7071 21.7072C15.8947 21.5196 16 21.2653 16 21V14H20C20.1883 13.9997 20.3727 13.9463 20.5319 13.846C20.6912 13.7456 20.819 13.6024 20.9005 13.4327C20.9821 13.263 21.0141 13.0737 20.993 12.8867C20.9719 12.6996 20.8984 12.5223 20.781 12.375L12.781 2.37505C12.4 1.90005 11.6 1.90005 11.219 2.37505L3.21903 12.375C3.10167 12.5223 3.0282 12.6996 3.00706 12.8867C2.98592 13.0737 3.01797 13.263 3.09953 13.4327C3.18108 13.6024 3.30883 13.7456 3.46812 13.846C3.6274 13.9463 3.81176 13.9997 4.00003 14Z" fill="black" />
                            </svg>
                            :
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.781 2.37505C12.4 1.90005 11.6 1.90005 11.219 2.37505L3.21903 12.375C3.10167 12.5223 3.0282 12.6996 3.00706 12.8867C2.98592 13.0737 3.01797 13.263 3.09953 13.4327C3.18108 13.6024 3.30883 13.7456 3.46812 13.846C3.6274 13.9463 3.81176 13.9997 4.00003 14H8.00003V21C8.00003 21.2653 8.10539 21.5196 8.29292 21.7072C8.48046 21.8947 8.73481 22 9.00003 22H15C15.2652 22 15.5196 21.8947 15.7071 21.7072C15.8947 21.5196 16 21.2653 16 21V14H20C20.1883 13.9997 20.3727 13.9463 20.5319 13.846C20.6912 13.7456 20.819 13.6024 20.9005 13.4327C20.9821 13.263 21.0141 13.0737 20.993 12.8867C20.9719 12.6996 20.8984 12.5223 20.781 12.375L12.781 2.37505ZM15 12H14V20H10V12H6.08103L12 4.60105L17.919 12H15Z" fill="black" />
                            </svg>
                        }
                        
                    </div>
                    <div className="vote-count">{voteCount}</div>
                    <div className="downvote" onClick={downvote}>
                        {
                            userDownvoted ?
                            
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.901 10.566C20.8192 10.3965 20.6913 10.2535 20.532 10.1534C20.3726 10.0533 20.1882 10.0001 20 10H16V3C16 2.73478 15.8947 2.48043 15.7071 2.29289C15.5196 2.10536 15.2652 2 15 2H9.00003C8.73481 2 8.48046 2.10536 8.29292 2.29289C8.10539 2.48043 8.00003 2.73478 8.00003 3V10H4.00003C3.81176 10.0003 3.6274 10.0537 3.46812 10.1541C3.30883 10.2545 3.18108 10.3977 3.09953 10.5674C3.01797 10.7371 2.98592 10.9263 3.00706 11.1134C3.0282 11.3005 3.10167 11.4778 3.21903 11.625L11.219 21.625C11.3127 21.7422 11.4316 21.8367 11.5667 21.9017C11.7019 21.9667 11.85 22.0005 12 22.0005C12.15 22.0005 12.2981 21.9667 12.4333 21.9017C12.5685 21.8367 12.6873 21.7422 12.781 21.625L20.781 11.625C21.021 11.324 21.067 10.913 20.901 10.566Z" fill="black" />
                            </svg>
                            :
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.219 21.625C11.6 22.1 12.4 22.1 12.781 21.625L20.781 11.625C20.8983 11.4777 20.9718 11.3004 20.9929 11.1133C21.0141 10.9263 20.982 10.737 20.9005 10.5673C20.8189 10.3976 20.6912 10.2544 20.5319 10.154C20.3726 10.0537 20.1882 10.0003 20 10H16L16 3C16 2.7347 15.8946 2.4804 15.7071 2.2928C15.5195 2.1053 15.2652 2 15 2H9C8.7348 2 8.4804 2.1053 8.2929 2.2928C8.1053 2.4804 8 2.7347 8 3V10H4C3.8117 10.0003 3.6273 10.0537 3.4681 10.154C3.3088 10.2544 3.181 10.3976 3.0995 10.5673C3.0179 10.737 2.9859 10.9263 3.007 11.1133C3.0281 11.3004 3.1016 11.4777 3.219 11.625L11.219 21.625ZM9 12H10V4H14L14 12H17.919L12 19.399L6.081 12H9Z" fill="black" />
                            </svg>


                        }
                        

                    </div>
                </div>
                
                <div className="solution-header">
                    {`Solution by ${solution.postedBy}`}
                </div>
                
            </div>

            <div className="solution-main-container">
                <p className="solution-text">
                    {getSolutionDisplay()}
                </p>
            </div>

            <div className={`rte-container ${isReplying ? "" : "alignment-right"}`}>
                <div title="Hide"
                    className={`reply-btn dark ${isReplying ? "hide-btn" : ""}`}
                    onClick={handleReplyBtnPress}>
                    {isReplying ? ">" : "Reply"}
                </div>

                {isReplying ?
                    <div className="rich-text-editor">
                        <RichTextEditor minimal={true} solutionTxtHandler={setReplyText} value={replyText}/>
                        <div className='add-solution-btn small-btn dark' onClick={handleReply}>
                            Submit
                        </div>
                    </div>
                    :
                    <></>
                }

            </div>

            {getReplies()}
        </div>
    );
}

export default Solution