const { resolve } = require("path");
const conn = require("../connections/db.js");

// Retrieve
// const fetchData = (sQuery)=>{
//     return conn.query(sQuery,(err,results)=>{
//         if(err){
//             console.log(err);
//         }
//         console.log(results);
//     });
// }


// const fetchData = (sql, cb)=>{
//     let result;
//     conn.query(sql,(err,res)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             result=res;
//            return cb(null,result);
//             // return result;
//         }
//     })
// }


const fetchData = async (sql) => {
    return new Promise((resolve) => {
        conn.query(sql, (err, res) => {
            if (err) {
                console.log(err);
            }
            resolve(res);
        })
    })
}

// Create
const insertData = (sQuery) => {
    return conn.query(sQuery, (err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Records inserted: " + results.affectedRows);
        }
    });
}

// Update
const updateData = (sQuery) => {
    return conn.query(sQuery, (err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Records updated: " + results.affectedRows);
        }
    });
}

// Delete
const deleteData = (sQuery) => {
    return conn.query(sQuery, (err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Records Deleted: " + results.affectedRows);
        }
    });
}

// login
const userLogin = async (sql) => {
    return new Promise((resolve) => {
        conn.query(sql, (err, res) => {
            if (err) {
                console.log(err);
            }
            resolve(res);
        })
    })
}


module.exports = {
    fetchData,
    insertData,
    updateData,
    deleteData,
    userLogin
}