const mongoose = require('mongoose');

const assigndSchema = new mongoose.Schema({
    projectname: {
        type: String,
        required: true
    },
    employeename: {
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    }
    
   
})

const AssignedProjects = mongoose.model('ASSIGNEDPROJECTS', assigndSchema);

module.exports =  AssignedProjects;