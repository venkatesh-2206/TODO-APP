const express=require("express");
const userRouters=express.Router();
const userControllers=require("../controller/usercontroller.js");
userRouters.post('/login',userControllers.login);
userRouters.post('/create',userControllers.postUser);
module.exports=userRouters;