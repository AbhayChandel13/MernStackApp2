const express = require('express');
const authenticate = require('../middleware/authenticate');
const router = express.Router();
const {login,logout,getUsers, createUser,createEmployee,deleteUser,getdata, getRoles, getEmployee,assignProject,createProject,getProjects,getassignedprojects,deleteEmployee, deleteProject, getSingleEmployee, updateEmployee, getSingleproject, updateProject, getItems, createItem} = require("../controller/criteria");


router.route("/signin").post(login);
router.route("/logout").get(logout);
router.route("/getdata").get(getdata);
router.route("/getEmployee").get(getEmployee);
router.route("/getRoles").get(getRoles);
router.route("/getUsers").get(getUsers); 
router.route("/projectsdata").get(getProjects);
router.route("/assignedprojects").get(getassignedprojects); 

router.route("/createUser").post(createUser);
router.route("/createEmployee").post(createEmployee);
router.route("/createproject").post(createProject);
router.route("/assignproject").post(assignProject);

router.route("/getemployee/:id").get(getSingleEmployee);
router.route("/employee/:id").put(updateEmployee);
router.route("/getproject/:id").get(getSingleproject);
router.route("/project/:id").put(updateProject);

router.route("/employee/:id").delete(deleteEmployee);
router.route("/:id").delete(deleteUser);
router.route("/project/:id").delete(deleteProject);

router.route("/getitems").get(getItems);
router.route("/createitem").post(createItem);



module.exports = router;