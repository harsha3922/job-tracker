//mongodb connection
const mongoose = require("mongoose")

async function connectDB() {
    try{
        // console.log("Connecting to MongoDB...")
          await mongoose.connect(process.env.MONGO_URI);
          console.log("mongodb connection successful") ;
    }
    catch(e){
        e.message;
        process.exit(1)
       
    }
}


module.exports = connectDB;    //index.js ma acquire kr
