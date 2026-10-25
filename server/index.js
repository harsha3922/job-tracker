require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes") 

const app = express();
connectDB();




//middleware
app.use(express.json()) 


//routes -  method + url + function
app.get("/", (req,res)=> {
    res.send("API running");
})

app.use("/api/auth", authRoutes)   //mount - prefix + bundle

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`server is running on port  ${PORT}`)
})


