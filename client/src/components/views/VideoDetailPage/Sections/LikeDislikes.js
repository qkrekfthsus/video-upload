import React, { useEffect, useState } from 'react';
import {Tooltip} from 'antd';
import Icon, {LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled} from '@ant-design/icons';
import axios from 'axios';

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [Dislikes, setDislikes] = useState(0);
    const [DislikeAction, setDislikeAction] = useState(null);
    let variable = {
        
    }
    if(props.video){
        variable = {videoId: props.videoId, userId: props.userId};
    }else{
        variable = {commentId: props.commentId, userId: props.userId};
    }
    useEffect(() => {
        axios.post('/api/like/getLikes', variable)
        .then(response => {
            if(response.data.success){
                // 얼마나 많은 좋아요를 받았는지
                    setLikes(response.data.likes.length)
                // 내가 이미 좋아요를 눌렀는지
                    response.data.likes.map(like => {
                        if(like.userId === props.userId){
                            setLikeAction("liked");
                        }
                    });
            }
            else{
                alert('Likes의 정보를 가져오는데 실패했습니다.');   
            }
        })

        axios.post('/api/like/getDisLikes', variable)
        .then(response => {
            if(response.data.success){
                // 얼마나 많은 싫어요를 받았는지
                    setDislikes(response.data.dislikes.length)
                // 내가 이미 싫어요를 눌렀는지
                    response.data.dislikes.map(dislike => {
                        if(dislike.userId === props.userId){
                            setDislikeAction("disliked");
                        }
                    });
            }
            else{
                alert('DisLikes의 정보를 가져오는데 실패했습니다.');   
            }
        })
        
    }, [])

    const onLike = () => {
        if(LikeAction === null){
            axios.post('/api/like/upLike', variable)
            .then(response => {
                if(response.data.success){
                    setLikes(Likes + 1);
                    setLikeAction("liked");
                    if(DislikeAction !== null){
                        setDislikeAction(null);
                        setDislikes(Dislikes - 1)
                    }
                }
                else{
                    alert("Like를 올리는데 실패했습니다.")
                }
            })
        }else{
            axios.post('/api/like/downLike', variable)
            .then(response => {
                if(response.data.success){
                    setLikes(Likes - 1);
                    setLikeAction(null);
                }
                else{
                    alert("Like를 내리는데 실패했습니다.")
                }
            })
        }
    }
    const onDislike = () => {
        if(DislikeAction === null){
            axios.post('/api/like/upDislike', variable)
            .then(response => {
                if(response.data.success){
                    setDislikes(Dislikes + 1);
                    setDislikeAction("disliked");
                    if(LikeAction !== null){
                        setLikeAction(null);
                        setLikes(Likes - 1)
                    }
                }
                else{
                    alert("Dislike를 올리는데 실패했습니다.")
                }
            })
        }else{
            axios.post('/api/like/downDislike', variable)
            .then(response => {
                if(response.data.success){
                    setDislikes(Dislikes - 1);
                    setDislikeAction(null);
                }
                else{
                    alert("Dislike를 내리는데 실패했습니다.")
                }
            })
        }
    }

    return (
        <div>
            <span key="comment-basic-like" onClick={onLike}>
                <Tooltip title="Like">
                    {
                        LikeAction ? <LikeFilled /> : <LikeOutlined />
                    }
                </Tooltip>
                <span style={{padding: '8px', cursor: 'auto'}}> {Likes} </span>
            </span>

            <span key="comment-basic-dislike" onClick={onDislike}>
                <Tooltip title="Dislike">
                    {
                        DislikeAction ? <DislikeFilled /> : <DislikeOutlined />
                    }
                </Tooltip>
                <span style={{padding: '8px', cursor: 'auto'}}> {Dislikes} </span>
            </span>
        </div>
    )
}

export default LikeDislikes
