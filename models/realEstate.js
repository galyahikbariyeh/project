const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const RealEstateSchema = new mongoose.Schema({
   
    title:{type:String,required: true},
    price:{type:String,required: true},
    image:{type:String,required: true},
  
    type: { 
        type: String, 
        required: true, 
     
       
      },
      
   
    
    
})







module.exports =mongoose.model('property',RealEstateSchema);