const dotenv = require('dotenv');
const mongoose = require('mongoose'); 
const express  = require('express');
const cookieParser = require('cookie-parser');
const app = express();
//const mernDataRoutes = require("./router/routes");


app.use(cookieParser());
dotenv.config({path: './config.env'});
require('./db/conn');

app.use(express.json());

const PORT = process.env.PORT;

// we link the router files to make our  route easy 
// app.get('/', (req, res) => {
//     res.send(`Hello Form the server `);

//  })
app.use(require('./router/auth'));
//app.use("/api/mernstack",  mernDataRoutes);




app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})