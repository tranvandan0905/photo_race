const express = require("express");
const { findcheckvoteTopicUser, postVoteTopic,deleteVoteTopic } = require("../controllers/voteTopic.controller");
const { getcomment, deletecomment,postcomment, patchcomment} = require("../controllers/comment.controller");
const { findlike, getsumlike, deletelike, postlike } = require("../controllers/like.controller");
const { postVoteSubmission, deleteVoteSubmission, getsumVoteSubmission, findVoteSub } = require("../controllers/voteSubmission.controller");
const routeAPI=express.Router();
// VoteTopic
routeAPI.get('/votetopics/user/:id', findcheckvoteTopicUser);
routeAPI.post('/votetopics', postVoteTopic);
routeAPI.delete('/votetopics/:topic_id/:user_id', deleteVoteTopic);
// Comments
routeAPI.get('/submissions/:id/comments', getcomment);
routeAPI.post('/comments', postcomment);
routeAPI.delete('/comments/:id', deletecomment);
routeAPI.patch('/comments/:id', patchcomment);
// Likes
routeAPI.get('/submissions/:id/likes', getsumlike);
routeAPI.post('/likes', postlike);
routeAPI.delete('/likes/:submission_id/:user_id', deletelike);
routeAPI.get('/likes/check/:submission_id/:user_id', findlike);
// VoteSubmission
routeAPI.get('/votesubmissions/:id', getsumVoteSubmission);
routeAPI.post('/votesubmissions', postVoteSubmission);
routeAPI.get('/votesubmissions/check/:submission_id/:user_id', findVoteSub);
routeAPI.delete('/votesubmissions/:submission_id/:user_id', deleteVoteSubmission);
module.exports=routeAPI;