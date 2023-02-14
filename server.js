const express = require("express");
const app = express();
const conn = require("./backend/connections/db.js");
const router = require("./backend/routes/routes.js");
const path = require("path");
var bodyParser = require("body-parser");

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use("/",router); 

// calling CSS
app.use(express.static(path.join(__dirname, "/frontend")));

// running the port
app.listen(9000,()=>{
    console.group("Server Listening on port 9000 !!")
})