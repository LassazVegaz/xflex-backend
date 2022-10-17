const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    DeliveryFee:{
        type:String,
       
    },
 
   Address:{
        type:String,
        required:true
    },
    Instruction:{
        type:String,
       
    },
    Note:{
        type:String,
        
    }


});

module.exports =  mongoose.model('Posts',postSchema);//Posts kiynne model eka db eke hedena name eka

