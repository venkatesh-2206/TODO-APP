const express= require("express")
const mongoose = require("mongoose");
const dotenv= require("dotenv");
dotenv.config();
const dbconnect=require("./config/db.js");
const model=require("./models/TODOmodel.js");
const routers=require("./routes/routers.js");
const app=express();
app.use(express.json());
app.use("/",routers);
console.log(process.env.PORT);
app.listen(process.env.PORT,()=>console.log(`server is running ${process.env.PORT}`));
