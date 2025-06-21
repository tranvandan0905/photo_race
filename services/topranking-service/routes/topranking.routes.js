const express = require("express");
const routeAPI=express.Router();
const { topranking }=require("../controllers/topranking.controller");
routeAPI.get('/',topranking);
routeAPI.get('/toprank',topranking);
module.exports=routeAPI;