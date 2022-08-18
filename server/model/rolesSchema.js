const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
   
   Role_id: {
        type: Number,
        required: true
    },
   Role: {
        type: String,
        required: true
    },
    
    
})

const Designation = mongoose.model('DESIGNATION', designationSchema);

module.exports =  Designation;