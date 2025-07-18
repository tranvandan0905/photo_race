const express = require("express");
const routeAPI = express.Router();
const { getuser, postuser, deleteduser, updateuser, FindIDuser, findUser,
    PatchVoteXU, CancelVoteXu, findNameUser, emailconfirmation, verifyUser,
    updateXU, emailpassword, verifyForgotPassword } = require("../controllers/user.controller");
routeAPI.get('/', getuser);
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
module.exports = routeAPI;