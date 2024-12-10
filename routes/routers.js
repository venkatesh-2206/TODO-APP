const express=require("express");
const routers=express.Router();
const Todocontrollers=require("../controller/controller.js");
routers.get('/',Todocontrollers.home);
routers.get('/todo',Todocontrollers.gettodos);
routers.get('/todo/:id',Todocontrollers.gettodobyid);
routers.post('/todo',Todocontrollers.posttodos);
routers.put('/todo/:id',Todocontrollers.puttodosbyid);
routers.delete('/todo/:id',Todocontrollers.deletetodosbyid);
module.exports=routers;
