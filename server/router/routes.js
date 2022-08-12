const express = require('express');
const router = express.Router();
const controller = require("./controller");
//const express = require('express');
// const router = Router();



router.post('/',controller.adduser);



module.exports = router;