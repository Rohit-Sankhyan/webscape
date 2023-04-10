const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
        // unique: true
    },
    phone : {
        type:Number,
        required:true
        // unique: true
    },
    message : {
        type : String,
        required:true
    }
});


// cerating collection

const contactData = new mongoose.model("Contactdata",contactSchema)
module.exports = contactData
