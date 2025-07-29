const express = require("express");
const routeAPI = express.Router();
const { getuser, postuser, deleteduser, updateuser, FindIDuser, findUser,
    PatchVoteXU, CancelVoteXu, findNameUser, emailconfirmation, verifyUser,
    updateXU, emailpassword, verifyForgotPassword,
    getPostUserCountByDateRange} = require("../controllers/user.controller");
const { findbankacc, postbankacc, updatebankacc, checkpass } = require("../controllers/bankAccount.comtroller");
const { postfrindship, updatefriendship, getfriendship } = require("../controllers/friendship.comtroller");
routeAPI.get('/', getuser);
routeAPI.get('/checkpass',checkpass);
routeAPI.post('/', postuser);
routeAPI.delete('/:id', deleteduser);
routeAPI.put('/:id', updateuser);
routeAPI.put('/banking/:id', updateXU);
routeAPI.get('/findID/:id', FindIDuser);
routeAPI.get('/find', findUser);
routeAPI.get('/find/name', findNameUser);
routeAPI.patch('/vote/:id', PatchVoteXU);
routeAPI.patch('/vote/Cancel/:id', CancelVoteXu);
routeAPI.post('/email-confirm', emailconfirmation);
routeAPI.get('/verify', verifyUser);
routeAPI.post('/email-password', emailpassword);
routeAPI.post('/verify-password', verifyForgotPassword);
routeAPI.post('/user-count-by-date', getPostUserCountByDateRange);
// bankAcc
routeAPI.get('/bankAcc/:id', findbankacc);
routeAPI.post('/bankAcc', postbankacc);
routeAPI.put('/bankAcc',updatebankacc );
//friendship
routeAPI.post('/friendship',postfrindship);
routeAPI.put('/friendship/:id',updatefriendship );
routeAPI.get('/friendship/:id/:check',getfriendship);
module.exports = routeAPI;