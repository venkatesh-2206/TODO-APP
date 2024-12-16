const express=require("express");
const taskRouters=express.Router();
const taskControllers=require('../controller/taskcontroller.js')
taskRouters.get('/gettask/:bucketId',taskControllers.getTaskById);
taskRouters.post('/posttask',taskControllers.createTask);
taskRouters.put('/puttask/:bucketId',taskControllers.updateTaskById);
taskRouters.delete('/deletetask/:bucketId',taskControllers.deleteTaskById);
module.exports=taskRouters;