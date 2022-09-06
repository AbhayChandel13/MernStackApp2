const express  = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const mongoose = require('mongoose'); 
const cookieParser = require('cookie-parser');
const app = express();
const connectDatabase = require("./db/conn");
const employees = require("./router/routes");


app.use(cookieParser());
dotenv.config({path: './config.env'});
connectDatabase();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// we link the router files to make our  route easy 
// app.get('/', (req, res) => {
//     res.send(`Hello Form the server `);

//  })
app.use("/api/v1/employees", employees);
// app.use(require('./router/auth'));
//app.use("/api/mernstack",  mernDataRoutes);


app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})