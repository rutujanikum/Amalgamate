var express = require('express');
var router = express.Router();
router.get("/",function(req,res,text){
    res.send("Route running successfully");
});

module.exports=router;