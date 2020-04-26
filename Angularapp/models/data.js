const mongoose=require("mongoose");
//const uniqueValidator = require("mongoose-unique-validator");

const dataSchema=mongoose.Schema({
    enteredAge : {type : Number , required : true,sparse:true},
    enteredGenderF : { type : Number , required : true,sparse:true},
    enteredGenderM : { type : Number , required : true,sparse:true},
    total_bilirubin : {type : Number , required : true,sparse:true},
    direct_bilirubin : {type : Number , required : true,sparse:true},
    alkaline_phosphotase : {type : Number , required : true,sparse:true},
    alamine_aminotransferase : {type : Number , required : true,sparse:true},
    aspartate_aminotransferase : {type : Number , required : true,sparse:true},
    total_proteins : {type : Number , required : true,sparse:true},
    albumin : {type : Number , required : true,sparse:true},
    albumin_and_globulin_ratio : {type : Number , required : true,sparse:true}
});
//dataSchema.plugin(uniqueValidator);
module.exports=mongoose.model('Input',dataSchema);