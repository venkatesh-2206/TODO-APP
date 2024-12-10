const mongoose=require("mongoose");
const dbconnect=mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("conneted to database"))
.catch((err)=>console.log("database not connected",err));
module.exports=dbconnect;