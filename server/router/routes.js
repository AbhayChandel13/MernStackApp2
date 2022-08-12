const express = require('express');
const Authenticate = require('../middleware/authenticate');
const router = express.Router();
const controller = require("./controller");
//const express = require('express');
// const router = Router();



router.post('/',controller.adduser);
router.post('/signin',controller.login);
router.post('/addemployee',controller.addEmployee);
router.get('/getdata', Authenticate,controller.getdata);




module.exports = router;