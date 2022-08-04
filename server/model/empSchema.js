const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    empid: {
        type: Number,
        required: true
    },    
    designation: {
        type: String,
        required: true
    }
     
    
})

const Employee = mongoose.model('EMPLOYEE', employeeSchema);

module.exports =  Employee;