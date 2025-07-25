const express = require("express");
const {momo, handleMoMoIPN} = require("../controllers/momo.controller");
const { postdepositRequet, postwithdrawRequet, GetDepositRequest, GetWithdrawRequest,
     getPostDepositRequestCountByDateRange, getPostWithdrawRequestCountByDateRange, 
     GetALLDepositRequest, GetALLWithdrawRequest, 
     updatewithdrawRequet} = require("../controllers/banking.controller");
const { handleMoMoIPNAds, momoAds } = require("../controllers/momoAds.controller");

const routeAPI=express.Router();
routeAPI.post('/momo',momo);
routeAPI.post('/momo/ipn',handleMoMoIPN);
routeAPI.post('/momoAds',momoAds);
routeAPI.post('/momo/ipnAds',handleMoMoIPNAds);
routeAPI.post('/depositrequest',postdepositRequet);
routeAPI.post('/withdrawrequest',postwithdrawRequet);
routeAPI.get('/depositrequest/:id',GetDepositRequest);
routeAPI.get('/withdrawrequest/:id',GetWithdrawRequest);
routeAPI.post('/deposit-count-by-date', getPostDepositRequestCountByDateRange);
routeAPI.post('/withdraw-count-by-date', getPostWithdrawRequestCountByDateRange);
routeAPI.get('/alldepositrequest',GetALLDepositRequest);
routeAPI.get('/allwithdrawrequest',GetALLWithdrawRequest);
routeAPI.put('/update-status/:id',updatewithdrawRequet);
module.exports=routeAPI;