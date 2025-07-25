const express = require("express");
const routeAPI = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { authenticateToken, authenticateTokenAds, authenticateTokenAdmin } = require('../controllers/middleware.getway');
const { postsubmission, getsubmission, FindsubTopic, deletesubmission, getPostCountByDateRange } = require('../controllers/submission.getway');
const { getTopic, postTopic, updateTopic, deleteTopic, findTopic } = require("../controllers/topic.getway");
const { getUser, findUser, deleteUser, updateUser, findUserById, patchVoteXu, postUser, findNameUser,
    updateAvataUser, resetpassword, verifyForgotPassword,
    getPostUserCountByDateRange } = require("../controllers/user.gateway");
const { findcheckvoteTopicUser, postVoteTopic, deleteVoteTopic, getcomment, postcomment, deletecomment,
    patchcomment, getsumlike, postlike, deletelike, findlike, postVoteSubmission,
    deleteVoteSubmission, findVoteSub } = require("../controllers/interaction.getway");
const { login, register, loginAds, registerAds } = require("../controllers/auth.getway");
const { topranking, sumtopranking, FindTopic_sub, Topranking_New, findUserScore } = require("../controllers/topranking.gatway");
const { PostAdvertiser, GetAdvertisers, DeleteAdvertiser, GetAds, GetAdsByAdvertiser,
    GetActiveAds, UpdateAds, Updateadver, FindverID, GetPaymentByAdvertiser,
    GetAdsByAdvertiserAdmin,
    UpdateAdsadmin,
    getAdpayment } = require("../controllers/ad.getway");
const { bankingMoMo, getdepositRequet, gettwithdrawRequet, bankingMoMoAds, postwithdrawRequet, getPostDepositRequestCountByDateRange, getPostWithdrawRequestCountByDateRange, GetALLDepositRequest, GetALLWithdrawRequest, updatewithdrawRequet } = require("../controllers/banking.getway");
const { validateEmail, validatefindNameUser, validateupdateAvataUser, validatecreateUser,
    validatecreatetopic, validateID, validatefindTopic, validatecreateSub } = require("../middlewares/validate.middleware");
const { findbankacc, postbankacc, updatebankacc, findbankaccuser } = require("../controllers/bankAccount.getway");
// Submission 
routeAPI.post('/submission', authenticateToken, upload.single("file"), validatecreateSub, postsubmission);
routeAPI.get('/submission', getsubmission);
routeAPI.delete('/submission/:id', authenticateToken, deletesubmission);
routeAPI.get('/submission/FindsubmissionTopic/:topic_id', FindsubTopic);
// Auth
routeAPI.post('/login', login);
routeAPI.post('/register', register);
routeAPI.post('/loginAds', loginAds);
routeAPI.post('/registerAds', registerAds);
// Topic 
routeAPI.get('/topic', getTopic);
routeAPI.post('/topic', validatecreatetopic, authenticateTokenAdmin, postTopic);
routeAPI.delete('/topic/:id', validateID, authenticateTokenAdmin, deleteTopic);
routeAPI.put('/topic/:id', validateID, authenticateTokenAdmin, updateTopic)
routeAPI.get('/topic/find', validatefindTopic, findTopic);
// User
routeAPI.get('/user', authenticateTokenAdmin, getUser);
routeAPI.post('/user', validatecreateUser, postUser);
routeAPI.delete('/user', authenticateToken, deleteUser);
routeAPI.put('/user', authenticateToken, updateUser);
routeAPI.put('/user/Avata', authenticateToken, upload.single("file"), validateupdateAvataUser, updateAvataUser);
routeAPI.get('/user/findID', authenticateToken, findUserById);
routeAPI.get('/user/find', validateEmail, findUser);
routeAPI.get('/user/find/name', validatefindNameUser, findNameUser);
routeAPI.patch('/user/vote/:id', validateID, patchVoteXu);
routeAPI.post('/email-password', resetpassword);
routeAPI.post('/verify-password', verifyForgotPassword);
// interaction 
// VoteTopic
routeAPI.get('/votetopics/user/:id', findcheckvoteTopicUser);
routeAPI.post('/votetopics', authenticateToken, postVoteTopic);
routeAPI.delete('/votetopics/:topic_id/:user_id', authenticateTokenAdmin, deleteVoteTopic);

// Comments
routeAPI.get('/submissions/:id/comments', getcomment);
routeAPI.post('/comments', authenticateToken, postcomment);
routeAPI.delete('/comments/:id', authenticateToken, deletecomment);
routeAPI.patch('/comments/:id', patchcomment);

// Likes
routeAPI.get('/submissions/:id/likes', getsumlike);
routeAPI.post('/likes', authenticateToken, postlike);
routeAPI.delete('/likes/:submission_id', authenticateToken, deletelike);
routeAPI.get('/likes/check/:submission_id', authenticateToken, findlike);
// Vote Submission
routeAPI.post('/votesubmissions', authenticateToken, postVoteSubmission);
routeAPI.delete('/votesubmissions/:submission_id', authenticateToken, deleteVoteSubmission);
routeAPI.get('/votesubmissions/check/:submission_id', authenticateToken, findVoteSub);
//Topranking
routeAPI.get('/topranking', authenticateTokenAdmin, topranking);
routeAPI.get('/topranking/toprank', sumtopranking);
routeAPI.get('/topranking-topic/:topic_id', FindTopic_sub);
routeAPI.get('/topranking/new-user-topranking', Topranking_New);
routeAPI.get('/findUserScore', authenticateToken, findUserScore);
// ad
//advertisers
routeAPI.post('/advertisers', PostAdvertiser)
routeAPI.get('/advertisers', GetAdvertisers);
routeAPI.get('/advertisersID', authenticateTokenAds, FindverID);
routeAPI.delete('/advertisers/:id', DeleteAdvertiser);
routeAPI.put('/advertisers', authenticateTokenAds, Updateadver);
//ads
routeAPI.post('/ads', authenticateTokenAds, bankingMoMoAds)
routeAPI.get('/ads', GetAds);
routeAPI.put('/ads/update/:id', authenticateTokenAds, UpdateAds);
routeAPI.get('/ads/byAdvertiser', authenticateTokenAds, GetAdsByAdvertiser);
routeAPI.get('/ads/activeAds', GetActiveAds);
// paymentads
routeAPI.get("/adpayment/:id", authenticateTokenAds, GetPaymentByAdvertiser);
//banking
routeAPI.post('/banking', authenticateToken, bankingMoMo);
routeAPI.get('/depositrequest', authenticateToken, getdepositRequet);
routeAPI.get('/withdrawrequest', authenticateToken, gettwithdrawRequet);
routeAPI.post('/withdrawrequest', authenticateToken, postwithdrawRequet);

//bankAcc
routeAPI.get('/bankAcc', authenticateToken, findbankacc);
routeAPI.post('/bankAcc', authenticateToken, postbankacc);
routeAPI.put('/bankAcc', authenticateToken, updatebankacc);
routeAPI.get('/bankAccuser/:id', findbankaccuser);
// admin
//thống kê
routeAPI.post('/deposit-count-by-date', authenticateTokenAdmin, getPostDepositRequestCountByDateRange);
routeAPI.post('/withdraw-count-by-date', authenticateTokenAdmin, getPostWithdrawRequestCountByDateRange);
routeAPI.post('/user-count-by-date', authenticateTokenAdmin, getPostUserCountByDateRange);
routeAPI.post('/sub-count-by-date', authenticateTokenAdmin, getPostCountByDateRange);
//Giao dịch
routeAPI.get('/alldepositrequest', authenticateTokenAdmin, GetALLDepositRequest);
routeAPI.get('/allwithdrawrequest', authenticateTokenAdmin, GetALLWithdrawRequest);
routeAPI.put('/update-status/:id', authenticateTokenAdmin, updatewithdrawRequet);
//ads
routeAPI.get('/ads/byAdvertiser/:id', authenticateTokenAdmin, GetAdsByAdvertiserAdmin);
routeAPI.put('/adsadmin/update/:id', authenticateTokenAdmin, UpdateAdsadmin);
routeAPI.get('/adPaymentAdmin', authenticateTokenAdmin, getAdpayment)
module.exports = routeAPI;


