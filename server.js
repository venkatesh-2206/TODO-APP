const {Client}=require('pg');
const express= require('express');
const dotenv=require('dotenv');
dotenv.config();
const routers = require('./routers/router.js');
const app=express();
app.use(express.json());
app.use('/',routers);
app.listen(process.env.port1,()=>console.log(`server is running ${process.env.port1}`));