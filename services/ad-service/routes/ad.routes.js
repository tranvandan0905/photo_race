const express = require("express");
const { PostAdvertiser,DeleteAdvertiser,getAdvertiser  } = require("../controllers/ad.controller");
const routeAPI=express.Router();
//advertisers
routeAPI.post('/advertisers',PostAdvertiser)
routeAPI.get('/advertisers',getAdvertiser);
routeAPI.delete('/advertisers/:id',DeleteAdvertiser);
module.exports=routeAPI;