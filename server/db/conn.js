const mongoose = require('mongoose');

// const DB = process.env.DATABASE;


// const connectDatabase = async () => {
//     mongoose.connect(DB).then(()=>{
//         console.log('Connection sucessful ');
//     }). catch((err)=>console.log(`Error in making Connection `));
//   };
  
  const connectDatabase = async () => {
     await mongoose.connect(process.env.DATABASE);
   console.log(`MongoDB connected`); 
  };

  module.exports = connectDatabase;

// mongoose.connect(DB).then(()=>{
//     console.log('Connection sucessful ');
// }). catch((err)=>console.log(`Error in making Connection `));