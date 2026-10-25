
const express = require("express");  //router esi sa milta ha
const {signup} = require("../controllers/authController");


const router = express.Router(); //routes ka mini bundle ha

//routes -  method + url + function
router.post("/signup", signup)

module.exports = router;