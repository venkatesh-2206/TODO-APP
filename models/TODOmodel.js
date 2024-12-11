const mongoose=require("mongoose");
const todoschema=new mongoose.Schema({
    task:{type:String},
    status:{type:String},
    dueDate: { type: Date },                        
    createdAt: { type: Date, default: Date.now },    
    updatedAt: { type: Date, default: Date.now },                       
    assignedTo: { type: String }
});
const TODO= mongoose.model('TODO',todoschema);
module.exports=TODO;