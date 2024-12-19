import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import userRouters from "./router/userrouter";
import taskRouters from "./router/taskrouter";
import bucketRouters from "./router/bucketrouter"
const app:Application=express();
app.use(express.json());
app.use('/user',userRouters);
app.use('/task',taskRouters);
app.use('/bucket',bucketRouters);
app.listen(process.env.port1,()=>console.log(`server is running ${process.env.port1}`));