
const express = require("express");  //router esi sa milta ha
const {signup, login} = require("../controllers/authController");


const router = express.Router(); //routes ka mini bundle ha

//routes -  method + url + function
router.post("/signup", signup)
router.post("/login", login)
module.exports = router;