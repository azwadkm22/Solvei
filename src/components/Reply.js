import React from "react";
import "./styles/Reply.css"

function Reply(props) {
    return (
        <div className="reply-row">
            <div className="reply-votes">
                <div>^</div>
                {/* <div className="upvote" /> */}
                <div className="vote-count">{props.vote}</div>
                <div>#</div>
            </div>

            <div className="reply-main-container">
                <div className="reply-header">Reply to 1</div>
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