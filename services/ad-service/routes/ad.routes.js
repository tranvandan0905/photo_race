const express = require("express");
const { PostAdvertiser,DeleteAdvertiser,GetAdvertisers, findadver, Updateadver, findadverID  } = require("../controllers/advertisers.controller");
const { PostAd, GetAds, GetAdsByAdvertiser, GetActiveAds, UpdateAds, UpdateAdsadmin } = require("../controllers/ads.controller");
const { PostAdpayment, PaymentByIDADS, getAdpayment } = require("../controllers/adPayment.controller");
const routeAPI=express.Router();
//advertisers
routeAPI.post('/advertisers',PostAdvertiser)
routeAPI.get('/advertisers',GetAdvertisers);
routeAPI.delete('/advertisers/:id',DeleteAdvertiser);
routeAPI.put('/advertisers/:id',Updateadver);
routeAPI.get('/advertisers/find', findadver);
routeAPI.get('/advertisers/:id',findadverID );
//ads
routeAPI.post('/ads',PostAd)
routeAPI.get('/ads',GetAds);
routeAPI.put('/ads/update/:id',UpdateAds);
routeAPI.put('/ads/updateadmin/:id',UpdateAdsadmin);
routeAPI.get('/ads/byAdvertiser/:id',GetAdsByAdvertiser);
routeAPI.get('/ads/activeAds',GetActiveAds);
//payment
routeAPI.post('/adPayment',PostAdpayment)
routeAPI.get('/adPaymentAdmin',getAdpayment)
routeAPI.get("/adpayment/:id", PaymentByIDADS);
module.exports=routeAPI;