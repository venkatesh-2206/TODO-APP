import express from "express";
const taskRouters=express.Router();
import { getTaskById,getstatusByTaskName,getTaskByStatus, createTask, updateTaskById, deleteTaskById} from "../controller/taskcontroller";
taskRouters.get('/gettask/:bucketId',getTaskById);
taskRouters.get('/getstatusbytaskname',getstatusByTaskName);
taskRouters.get('/gettaskbystatus',getTaskByStatus);
taskRouters.post('/createtask',createTask);
taskRouters.put('/updatetask/:bucketId',updateTaskById);
taskRouters.delete('/deletetask/:bucketId',deleteTaskById);
export default taskRouters;