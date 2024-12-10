
const TODO=require("../models/TODOmodel");

function home(req,res){
    res.send("welcome to home page");
};
async function gettodos(req,res){
    const data=await TODO.find();
    res.json(data);
};
async function gettodobyid(req,res){
    const id= req.params.id;
    const data=await TODO.findById(id);
    res.json(data);
};
async function posttodos(req,res){
    //const data1=await TODO.create(req.body);
    const data1=await TODO.insertMany([req.body]);
    res.json(data1);

};
async function puttodosbyid(req,res){
    const id1=req.params.id;
    const updated=await TODO.findByIdAndUpdate(id1,req.body,{new:true});
    if(updated){
        res.json(updated);
    }else{
        res.json({message:"can't able to update"});
    }
};
async function deletetodosbyid(req,res){
    const id2=req.params.id;
    const deleted=await TODO.findByIdAndDelete(id2);
    if(deleted){
        const presentdata=await TODO.find();
        res.json(presentdata);
    }else{
        res.json({message:"can't find the id"});
    }
};
module.exports = {home,gettodos,gettodobyid,posttodos,puttodosbyid,deletetodosbyid};