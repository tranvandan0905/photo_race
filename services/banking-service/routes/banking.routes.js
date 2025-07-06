const express = require("express");
const {momo, handleMoMoIPN} = require("../controllers/momo.controller");
const { postdepositRequet, postwithdrawRequet } = require("../controllers/banking.controller");
const routeAPI=express.Router();
routeAPI.post('/momo',momo);
routeAPI.post('/momo/ipn',handleMoMoIPN);
routeAPI.post('/depositrequest',postdepositRequet);
routeAPI.post('/withdrawrequest',postwithdrawRequet);
module.exports=routeAPI;