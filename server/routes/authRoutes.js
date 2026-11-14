
const express = require("express");  //router esi sa milta ha
const {signup, login} = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware")


const router = express.Router(); //routes ka mini bundle ha

//routes -  method + url + function
router.post("/signup", signup)
router.post("/login", login)
router.get("/me", protect, (req,res) => {
    res.json({userId: req.user})
})





module.exports = router;