const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

// Like ROUTER

router.post('/getLikes', (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId};
    }
    else{
        variable = {commentId: req.body.commentId};
    }
    Like.find(variable)
    .exec((err, likes) => {
        console.log(likes);
        if(err) return res.status(400).send(err);
        return res.status(200).json({success: true, likes})
    })
});

router.post('/getDisLikes', (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId};
    }
    else{
        variable = {commentId: req.body.commentId};
    }
    Dislike.find(variable)
    .exec((err, dislikes) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success: true, dislikes})
    })
});

router.post('/upLike', (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId: req.body.userId};
    }
    else{
        variable = {commentId: req.body.commentId, userId: req.body.userId};
    }
    
    // Like Collection에 클릭 정보 저장

    const like = new Like(variable);
    like.save((err, likeResult) => {
        if(err) return res.json({success: false, err})
        
        // dislike 클릭된 상태에서 like를 눌렀을 때
        Dislike.findOneAndDelete(variable)
        .exec((err, disLikeResult) => {
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({success: true});
        })

    })


})

router.post('/downLike', (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId};
    }
    else{
        variable = {commentId: req.body.commentId};
    }
    
    Like.findOneAndDelete(variable)
    .exec((err, result) => {
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true});
    })
    


})

router.post('/upDislike', (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId: req.body.userId};
    }
    else{
        variable = {commentId: req.body.commentId, userId: req.body.userId};
    }
    
    // Didslike Collection에 클릭 정보 저장

    const dislike = new Dislike(variable);
    dislike.save((err, dislikeResult) => {
        if(err) return res.json({success: false, err})
        
        // like 클릭된 상태에서 like를 눌렀을 때
        Like.findOneAndDelete(variable)
        .exec((err, LikeResult) => {
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({success: true});
        })

    })


})

router.post('/downDislike', (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId};
    }
    else{
        variable = {commentId: req.body.commentId};
    }
    
    Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true});
    })
    


})


module.exports = router;
