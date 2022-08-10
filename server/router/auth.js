const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");


require('../db/conn');
const User = require('../model/userSchema');
const Employee = require('../model/empSchema');
const { db } = require('../model/userSchema');


router.get('/', (req, res) => {
    res.send(`Hello Form the server Router js`);

})

//Using Async and Await :--

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
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
            const user = new User({ name, email, phone, work, password, cpassword });
            await user.save()
            res.status(201).json({ message: "User Registered Successfully " });
        }


    }
    catch (err) {
        console.log(err);
    }

})

//Creating new employee

router.post('/employee', async (req, res) => {
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

})


//login route:--
router.post('/signin', async (req, res) => {

    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill data in both the field " })
        }

        const userLogin = await User.findOne({ email: email });
        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })

            if (!isMatch) {
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



    //about Page 

    // router.get('/about', authenticate, (req, res) => {
    //     console.log("Hello from About");
    //     res.send(req.rootUser);
    // });

    //Contact  Page 

    // router.get('/contact', authenticate, (req, res) => {
    //     console.log("Hello from Contact ");
    //     res.send(req.rootUser);
    // });

    
    // get User data for homepage and contact page

    router.get('/getdata', authenticate, (req, res) => {
        console.log("Hello ");
        res.send(req.rootUser);
    });




    //get Single Employee For update :
    
    router.get('/getemployee/:id', authenticate,async (req, res) => {
        // console.log("Hello ");
        // res.send(req.rootUser);
        try {
            const _id = req.params.id;
            const employeedata = await Employee.findById(_id);
            if (!employeedata) {
              return res.status(404).send();
            } else {
              res.send(employeedata);
            }
          } catch (e) {
            res.status(500).send(e);
          }
    });
   
    //Update the Employee data :
    router.put("/employee/:id",async(req,res)=>{
        try{
            const _id =req.params.id;
            const updateEmployee = await Employee.findByIdAndUpdate(_id,req.body,{
              new:true
            });
      
            res.send(updateEmployee);
        }catch(e){
          res.status(404).send(e);
        }
      })

//Delete Employee :
  router.delete("/employee/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const deleteEmployee = await Employee.findByIdAndDelete(_id);
      if (!req.params.id) {
        return res.status(404).send();
      }
      res.send(deleteEmployee);
    } catch (e) {
      res.status(500).send(e);
    }
  });

    //LOGOUT PAGE 

    router.get('/logout', async (req, res) => {
        console.log("Hello logout");
        // res.clearCookie('jwtoken');     
        // req.user.tokens = req.user.tokens.filter((currElement)=>{
        //     return currElement.token != req.token
        // })  
        res.clearCookie('jwtoken', { path: '/' });
        // await req.user.save() 
        res.status(200).send("User logout");
    });
})

//read the data of registered  Users :

router.get("/users", async (req, res) => {
    try {
        const usersdata = await User.find();
        res.send(usersdata);
    } catch (err) {
        res.send(err);
    }
});

router.get("/employeedata", async (req, res) => {
    try {

        const employeedata = await Employee.aggregate([{

                    // $lookup :{
                    //             from :"designation",
                    //             localField :"roleid",
                    //             foreignField:"Role_id ",
                    //             as :"designation"
                    // }
                    '$lookup': {
                        'from': 'designation', 
                        'localField': 'roleid', 
                        'foreignField': 'Role_id', 
                        'as': 'designation'
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$designation", 0 ] }, "$$ROOT" ] } }
                 },
                 { $project: { designation: 0 } }
            ])


       //const employeedata = await Employee.find();
        res.send(employeedata);
    } catch (err) {
        res.send(err);
    }
});


module.exports = router;