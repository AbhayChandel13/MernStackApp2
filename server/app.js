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

app.use(express.json({limit: "30mb",extended:true}));
app.use(express.urlencoded({limit: "30mb",extended:true}));

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use("/api/v1/employees", employees);



app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})