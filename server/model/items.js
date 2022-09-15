const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({ 
   
   title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdat: {
        type: Date,        
        }
    
})

const Item = mongoose.model('ITEMS',itemSchema );

module.exports = Item ;