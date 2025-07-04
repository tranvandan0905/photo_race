const express = require("express");
const { PostAdvertiser,DeleteAdvertiser,GetAdvertisers, findadver, Updateadver  } = require("../controllers/advertisers.controller");
const { PostAd, GetAds, GetAdsByAdvertiser, GetActiveAds, UpdateAds } = require("../controllers/ads.controller");
const routeAPI=express.Router();
//advertisers
routeAPI.post('/advertisers',PostAdvertiser)
routeAPI.get('/advertisers',GetAdvertisers);
routeAPI.delete('/advertisers/:id',DeleteAdvertiser);
routeAPI.put('/advertisers/:id',Updateadver);
routeAPI.get('/advertisers/find', findadver);
//ads
routeAPI.post('/ads',PostAd)
routeAPI.get('/ads',GetAds);
routeAPI.get('/ads/update/:id',UpdateAds);
routeAPI.get('/ads/byAdvertiser/:id',GetAdsByAdvertiser);
routeAPI.get('/ads/activeAds',GetActiveAds);
module.exports=routeAPI;