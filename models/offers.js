const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({

    offerID:{
        type:String,
        required:true
    },
    offerName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Offers',offerSchema) //db eke table hedena name eka Offers