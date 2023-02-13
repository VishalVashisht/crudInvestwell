const mysql = require('mysql2');
const path = require("path");

const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"formdb",
    password:"11032001"
})

conn.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("DB Connected !!");
    }
})

module.exports=conn;