const express=require("express");
const todoRouters=express.Router();
const Todocontrollers=require('../controller/todocontroller.js')
todoRouters.get('/todo/:id',Todocontrollers.getTodosById);
todoRouters.post('/todo',Todocontrollers.postTodos);
todoRouters.put('/todo/:id',Todocontrollers.putTodosById);
todoRouters.delete('/todo/:id',Todocontrollers.deleteTodosById);
module.exports=todoRouters;