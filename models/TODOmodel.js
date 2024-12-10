const mongoose=require("mongoose");
const todoschema=new mongoose.Schema({
    task:{type:String},
    status:{type:String}
});
const TODO= mongoose.model('TODO',todoschema);
module.exports=TODO;