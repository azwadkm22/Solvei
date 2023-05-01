import React, { useState } from "react";
import "./styles/Reply.css"

function Reply(props) {
    const [voteCount, setVoteCount] = useState(props.vote);

    function upvote() {
        setVoteCount(voteCount + 1);
    }

    function downvote() {
        setVoteCount(voteCount - 1);
    }


    return (
        <div className="reply-row">
            <div className="reply-votes">
                <div className="upvote" onClick={upvote}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.781 2.37505C12.4 1.90005 11.6 1.90005 11.219 2.37505L3.21903 12.375C3.10167 12.5223 3.0282 12.6996 3.00706 12.8867C2.98592 13.0737 3.01797 13.263 3.09953 13.4327C3.18108 13.6024 3.30883 13.7456 3.46812 13.846C3.6274 13.9463 3.81176 13.9997 4.00003 14H8.00003V21C8.00003 21.2653 8.10539 21.5196 8.29292 21.7072C8.48046 21.8947 8.73481 22 9.00003 22H15C15.2652 22 15.5196 21.8947 15.7071 21.7072C15.8947 21.5196 16 21.2653 16 21V14H20C20.1883 13.9997 20.3727 13.9463 20.5319 13.846C20.6912 13.7456 20.819 13.6024 20.9005 13.4327C20.9821 13.263 21.0141 13.0737 20.993 12.8867C20.9719 12.6996 20.8984 12.5223 20.781 12.375L12.781 2.37505ZM15 12H14V20H10V12H6.08103L12 4.60105L17.919 12H15Z" fill="black" />
                </svg>
                </div>
                <div className="vote-count">{voteCount}</div>
                <div className="downvote" onClick={downvote}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.219 21.625C11.6 22.1 12.4 22.1 12.781 21.625L20.781 11.625C20.8983 11.4777 20.9718 11.3004 20.9929 11.1133C21.0141 10.9263 20.982 10.737 20.9005 10.5673C20.8189 10.3976 20.6912 10.2544 20.5319 10.154C20.3726 10.0537 20.1882 10.0003 20 10H16L16 3C16 2.7347 15.8946 2.4804 15.7071 2.2928C15.5195 2.1053 15.2652 2 15 2H9C8.7348 2 8.4804 2.1053 8.2929 2.2928C8.1053 2.4804 8 2.7347 8 3V10H4C3.8117 10.0003 3.6273 10.0537 3.4681 10.154C3.3088 10.2544 3.181 10.3976 3.0995 10.5673C3.0179 10.737 2.9859 10.9263 3.007 11.1133C3.0281 11.3004 3.1016 11.4777 3.219 11.625L11.219 21.625ZM9 12H10V4H14L14 12H17.919L12 19.399L6.081 12H9Z" fill="black" />
                    </svg>

                </div>
            </div>

            <div className="reply-main-container">
                {/* <div className="reply-header">
                    {props.isSolution ? <>Solution 1 </> : <>Reply to 1</>}                    
                </div> */}
                <p className="reply-text">
                    Lorem Ipsum is simply dummy text of the printi
                    ng and typesetting industry. Lorem Ipsum has b
                    een the industry's standard dummy text ever si
                    nce the 1500s, when an unknown printer took a 
                    galley of type and scrambled it to make a type 
                    specimen book. It has survived not only five c
                    enturies, but also the leap into electronic ty
                    pesetting, remaining essentially unchanged. It
                    was popularised in the 1960s with the release 
                    of Letraset sheets containing Lorem Ipsum pass
                    ages, and more recently with desktop publishing
                    software like Aldus PageMaker including versions 
                    of Lorem Ipsum
                </p>
            </div>
        </div>
    );
}

export default Reply