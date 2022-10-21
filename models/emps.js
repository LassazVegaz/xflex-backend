const mongoose =  require('mongoose');//

const empSchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:true
    },
  
   
    feedback:{
        type:String,
        required:true
    }


});

module.exports = mongoose.model('emps',empSchema);