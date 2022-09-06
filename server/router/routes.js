const express = require('express');
// const Authenticate = require('../middleware/authenticate');
const router = express.Router();
const {login,getUsers, createUser,createEmployee,deleteUser, logout,getdata, getRoles, getEmployee,assignProject,createProject,getProjects,getassignedprojects,deleteEmployee, deleteProject} = require("../controller/criteria");


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

router.route("/:id").delete(deleteUser);
router.route("/employee/:id").delete(deleteEmployee);
router.route("/project/:id").delete(deleteProject);



module.exports = router;