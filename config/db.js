const express=require('express');
const {Client}=require('pg');
const con=new Client({
    host:process.env.host,
    user:process.env.user,
    port:process.env.port,
    password:process.env.password,
    database:process.env.database
})
con.connect()
    .then(()=>console.log("db connected"))
    .catch((err)=>console.log("db not connected",err));
module.exports=con;