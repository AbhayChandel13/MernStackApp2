const mongoose = require('mongoose');

const empinfoSchema = new mongoose.Schema({ 
   
   empid: {
        type: Number,
        required: true
    },
   file1: {
        type: String,
        required: true
    },
    file2: {
        type: String,
        required: true
    },
    file3: {
        type: String,
        required: true
    },
    
    
})

const Empinfo = mongoose.model('EMPINFO', empinfoSchema);

module.exports =  Empinfo;