const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
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

     //Creating new employee
    const addEmployee = async (req, res)=>{
 
    const {firstname, lastname, email, empid,phone, roleid} = req.body;

    if (!firstname || !lastname || !email || !empid || !phone || !roleid) {
        return res.status(422).json({ error: "Please Fill  correct data " })
    }

    try {
        // const employeeExist = await Employee.findOne({ email: email })
        // if (employeeExist) {
        //     return res.status(422).json({ error: "email already Exist" });
        // }
       
        // else {
        //     const user = new User({ name, email, phone, work, password, cpassword });
        //     await user.save()
        //     res.status(201).json({ message: "User Registered Successfully " });
        // }
        const employee = new Employee({ firstname, lastname, email, empid, phone, roleid});
          await employee.save();
          res.status(201).json({ message: "Employee Created Successfully " });

    }
    catch (err) {
        console.log(err);
    }

 

}

 //login route:--

 const login = async(req, res)=>{

    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill data in both the field " })
        }

        const userLogin = await User.findOne({ email: email });
       
    //    console.log(userLogin);
        if (userLogin) {
           // const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })

            if (!userLogin) {
                res.status(400).json({ error: "Invalid Credentials pass" });
            } else {
                res.json({ message: "User Signin Successfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }

        // if (!userLogin) {
        //     res.json({ error: "User Does Not Exits" });
        // } else {
        //     res.json({ message: "User SignIn Successfully" });
        // }
    } catch (err) {
        console.log(err);
    }

}

    // get User data for homepage and contact page

    const getdata = async(req,res,Authenticate)=>{
        try {
            // console.log("Hello ");
          res.send(req.rootUser);
          } catch (error) {
              console.log(error);
          }
    }



module.exports ={
    adduser,
    addEmployee,
    login,
    getdata
}