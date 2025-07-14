const express = require("express");
const { findcheckvoteTopicUser, postVoteTopic,deleteVoteTopic } = require("../controllers/voteTopic.controller");
const { getcomment, deletecomment,postcomment, patchcomment, deletecmt} = require("../controllers/comment.controller");
const { findlike, getsumlike, deletelike, postlike, deleteMany } = require("../controllers/like.controller");
const { postVoteSubmission, deleteVoteSubmission, getsumVoteSubmission, findVoteSub } = require("../controllers/voteSubmission.controller");
const routeAPI=express.Router();
// VoteTopic
routeAPI.get('/votetopics/user/:id', findcheckvoteTopicUser);
routeAPI.post('/votetopics', postVoteTopic);
routeAPI.delete('/votetopics/:topic_id/:user_id', deleteVoteTopic);
// Comments
routeAPI.get('/submissions/:id/comments', getcomment);
routeAPI.post('/comments', postcomment);
routeAPI.delete('/comments/:id/:user_id', deletecomment);
routeAPI.patch('/comments/:id', patchcomment);
routeAPI.delete('/deletemany/comments/:submission_id', deletecmt);
// Likes
routeAPI.get('/submissions/:id/likes', getsumlike);
routeAPI.post('/likes', postlike);
routeAPI.delete('/deletemany/likes/:submission_id', deleteMany);
routeAPI.delete('/likes/:submission_id/:user_id', deletelike);
routeAPI.get('/likes/check/:submission_id/:user_id', findlike);
// VoteSubmission
routeAPI.get('/votesubmissions/:id', getsumVoteSubmission);
routeAPI.post('/votesubmissions', postVoteSubmission);
routeAPI.get('/votesubmissions/check/:submission_id/:user_id', findVoteSub);
routeAPI.delete('/votesubmissions/:submission_id/:user_id', deleteVoteSubmission);
module.exports=routeAPI;