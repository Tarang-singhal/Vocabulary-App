const mongoose = require("mongoose");


var wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    definition:{
        type: String,
        default: null   
    },
    // example: {
    //     type: String,
    //     default: null   
    // },
    lexicalCategory:String
})

module.exports = mongoose.model("words",wordSchema);