import axios from 'axios';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';


function Comment(props) {
    const videoId = props.postId;
    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("");

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        
        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }

        axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.result);
                props.refresh(response.data.result);
                setcommentValue("");
            }
            else{
                alert("코멘트를 저장하지 못했습니다.");
            }
        })
    }

    return (
        <div>
            <br />
            <p> Replies</p>
            <hr />

            {/* Comment Lists */}

            {props.commentLists && props.commentLists.map((comment, index) => {
                return (!comment.responseTo && 
                <React.Fragment>
                    <SingleComment refresh={props.refresh} comment={comment} postId={videoId}/>
                    <ReplyComment refresh={props.refresh} parentCommentId={comment._id} commentLists={props.commentLists} postId={videoId}/>
                </React.Fragment>
                )
            })}
            
        

            {/* Root Comment Form */}

            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>

            </form>
        </div>
    )
}

export default Comment
