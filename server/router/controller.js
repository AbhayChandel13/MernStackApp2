const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate");

require('../db/conn');
const User = require('../model/userSchema');
const Employee = require('../model/empSchema');


 const adduser = async (req, res)=>{
   
        const { name, email, role , phone, password, cpassword } = req.body;
    
        if (!name || !email || !role || !phone || !password || !cpassword) {
            return res.status(422).json({ error: "Please Filled the correct data " })
        }
    
        try {
            const userExist = await User.findOne({ email: email })
            if (userExist) {
                return res.status(422).json({ error: "email already Exist" });
            }
            else if (password != cpassword) {
                return res.status(422).json({ error: "Password are not matching" });
            }
            else {
                const user = new User({ name, email, role, phone, password, cpassword });
                await user.save()
                res.status(201).json({ message: "User Registered Successfully "});
            }
    
    
        }
        catch (err) {
            console.log(err);
        }
    
     }


module.exports ={
    adduser,
}