const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectname: {
        type: String,
        required: true
    },
    industrysegment: {
        type: String,
        required: true
    },
    techstack: {
        type: String,
        required: true
    },
    thirdpartyapi: {
        type: String,
        required: true
    },
    paymentgateway: {
        type:String,
        required: true
    },     
    githuburl: {
        type: String,
        required: true
    },
    projectscope: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    } 
     
})

const Projects = mongoose.model('PROJECTS', projectSchema);

module.exports =  Projects;