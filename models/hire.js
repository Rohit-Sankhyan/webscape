
const mongoose = require("mongoose")
let hierSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true
    },
    email : {
        type:String,
        required:true,
        // unique: true
    },
    phone : {
        type:Number,
        required:true
        // unique: true
    },
    project : {
        type:String,
        required : true
    },
    projectTech :{
        type:String,
        required: true
    },
    projectDisc:{
        type : String,
        required : true
    }

});
let hiermodel = mongoose.model("hireData",hierSchema);
module.exports = hiermodel;