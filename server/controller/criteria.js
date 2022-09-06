const path = require("path");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

const Employee = require("../model/empSchema");
const User = require("../model/userSchema");
const Projects = require("../model/projectSchema");
const AssignedProjects = require("../model/assigndSchema");
const Designation = require("../model/rolesSchema");

//login route:--
exports.login = async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please fill data in both the field " });
    }

    const userLogin = await User.findOne({ email: email });

    //    console.log(userLogin);
    if (userLogin) {
      // const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!userLogin) {
        res.status(400).json({ error: "Invalid Credentials pass" });
      } else {
        res.json({ message: "User Signin Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }

  } catch (err) {
    console.log(err);
  }

}

  //Logout route:--

  exports.logout= async (req, res) => {
    try {
      res.clearCookie("jwtoken", { path: "/" });
      // await req.user.save()
      res.status(200).send("User logout");
    } catch (error) {
      console.log(error);
    }
  };

// get User data for homepage and contact page

exports.getdata =   async ( req, res) => {
  try {
    // console.log("Hello ");
    res.send(req.rootUser);
  } catch (error) {
    console.log(error);
  }
};



//Get Users
exports.getUsers = async (req, res) => {
  try {
    const usersdata = await User.find();
    res.send(usersdata);
  } catch (err) {
    res.send(err);
  }
};

//Create User 
exports.createUser = async (req, res) => {
    const { name, email, role, phone, password, cpassword } = req.body;
  
    if (!name || !email || !role || !phone || !password || !cpassword) {
      return res.status(422).json({ error: "Please Filled the correct data " });
    }
  
    try {
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return res.status(422).json({ error: "email already Exist" });
      } else if (password != cpassword) {
        return res.status(422).json({ error: "Password are not matching" });
      } else {
        const user = new User({ name, email, role, phone, password, cpassword });
        await user.save();
        res.status(201).json({ message: "User Registered Successfully " });
      }
    } catch (err) {
      console.log(err);
    }
  };

//Delete User :
exports.deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteUser = await User.findByIdAndDelete(_id);
    if (!req.params.id) {
      return res.status(404).send();
    }
    res.send(deleteUser);
  } catch (e) {
    res.status(500).send(e);
  }
};


//get Employees table data:
exports.getEmployee = async (req, res) => {
  try {
    const employeedata = await Employee.aggregate([
      {
        $lookup: {
          from: "designations",
          localField: "roleid",
          foreignField: "Role_id",
          as: "designation",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$designation", 0] }, "$$ROOT"],
          },
        },
      },
      { $project: { designation: 0 } },
    ]);

    //const employeedata = await Employee.find();
    res.send(employeedata);
  } catch (err) {
    res.send(err);
  }
};

//Creating new employee
  exports.createEmployee= async (req, res) => {
  const { firstname, lastname, email, empid, phone, roleid } = req.body;

  if (!firstname || !lastname || !email || !empid || !phone || !roleid) {
    return res.status(422).json({ error: "Please Fill  correct data " });
  }

  try {   
    const employee = new Employee({
      firstname,
      lastname,
      email,
      empid,
      phone,
      roleid,
    });
    await employee.save();
    res.status(201).json({ message: "Employee Created Successfully " });
  } catch (err) {
    console.log(err);
  }
};

//Get data of Roles table :
exports.getRoles= async (req, res) => {
  try {
    const usersroles = await Designation.find();
    res.send(usersroles);
  } catch (err) {
    res.send(err);
  }
};

//Creating new project

exports.createProject= async (req, res) => {
  const {
    projectname,
    industrysegment,
    techstack,
    thirdpartyapi,
    paymentgateway,
    githuburl,
    projectscope,
    solution,
  } = req.body;


  try {
   
    const project = new Projects({
      projectname,
      industrysegment,
      techstack,
      thirdpartyapi,
      paymentgateway,
      githuburl,
      projectscope,
      solution,
    });
    await project.save();
    res.status(201).json({ message: "Project Created Successfully " });
  } catch (err) {
    console.log(err);
  }
};

//Get Project data from project collection

exports.getProjects=async (req, res) => {
  try {
    const projectsdata = await Projects.find();
    res.send(projectsdata);
  } catch (err) {
    res.send(err);
  }
};


//Assigning a New project :
exports.assignProject = async (req, res) => {
  const { projectname, Empid, startdate, enddate } = req.body;

  if (!projectname || !Empid || !startdate || !enddate) {
    return res.status(422).json({ error: "Please Fill  correct data " });
  }

  try {
    const employee = new AssignedProjects({
      projectname,
      Empid,
      startdate,
      enddate,
    });
    await employee.save();
    res.status(201).json({ message: "Project Asssigned Successfully " });
  } catch (err) {
    console.log(err);
  }
};

//Getting the data for assignedProject table :
exports.getassignedprojects = async (req, res) => {
  try {
    // const assignedprojects = await AssignedProjects.find();
    // res.send(assignedprojects);

    const assignedprojects = await AssignedProjects.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "Empid",
          foreignField: "empid",
          as: "employee",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$employee", 0] }, "$$ROOT"],
          },
        },
      },
      { $project: { employee: 0 } },
    ]);

    res.send(assignedprojects);
  } catch (err) {
    res.send(err);
  }
};


//Delete Employee :

exports.deleteEmployee = async (req, res) => {
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
};

 //Delete Project :
 exports.deleteProject = async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteProject = await Projects.findByIdAndDelete(_id);
    if (!req.params.id) {
      return res.status(404).send();
    }
    res.send(deleteProject);
  } catch (e) {
    res.status(500).send(e);
  }
};