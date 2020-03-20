const mongoose=require("mongoose");
//const uniqueValidator = require("mongoose-unique-validator");

const postSchema=mongoose.Schema({
    username : {type : String , required : true},
    password : { type : String , required : true}
});
//postSchema.plugin(uniqueValidator);
module.exports=mongoose.model('Post',postSchema);