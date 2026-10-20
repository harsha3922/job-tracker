require("dotenv").config();
const express = require("express");


const app = express();
const PORT = process.env.PORT || 5000;

//routes
app.get("/", (req,res)=> {
    res.send("API running");
})


app.listen(PORT, ()=> {
    console.log("server is running on port", PORT )
})


module.exports = app;