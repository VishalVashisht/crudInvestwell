const { resolve } = require("path");
var CryptoJS = require("crypto-js");
const { fetchData, insertData, updateData, deleteData, userLogin } = require("../repositories/userDb.js")


const serviceFetchData = async () => {
    // const query = `select * from users`;
    const query1 = `select fname,lname,phone,gender,email from users`;
    const result = await fetchData(query1);
    return new Promise((resolve) => {
        resolve(result);
    })
}

// const serviceFetchData = (cb)=>{
//     const query = `select * from users`;
//     // return fetchData(query);
//     const result = fetchData(query,(err,res)=>{
//         cb(null,res);
//         return res;
//     })
// }

const serviceInsertData = (newUser) => {
    const { firstName, lastName, phone, gender, email, password } = newUser;
    let encryptedPass = CryptoJS.AES.encrypt(password,"k4WQ,]+.C").toString();
    const query = `insert into users (fname, lname, phone, gender, email, pass) values ("${firstName}", "${lastName}", "${phone}", "${gender}", "${email}", "${encryptedPass}")`;
    return insertData(query);
}

const serviceUpdateData = (updateUser) => {
    let encryptedPass = CryptoJS.AES.encrypt(updateUser.password,"k4WQ,]+.C").toString();

    const query = `update users set fname="${updateUser.firstName}",
    lname="${updateUser.lastName}",
    phone="${updateUser.phone}",
    gender="${updateUser.gender}",
    pass="${encryptedPass}"
    where userId = "${updateUser.id}"`;
    return updateData(query);
}

const serviceDeleteData = (id) => {
    const query = `delete from users where userId = ${id}`;
    return deleteData(query);
}


const serviceUserLogin = async (details) => {
    // const query = `select * from users where email ="${details.username}" and pass = "${details.password}"`;
    const query = `select * from users where email ="${details.username}"`;
    const result = await userLogin(query);
    return new Promise((resolve) => {
        resolve(result);
    })
}

module.exports = {
    serviceFetchData,
    serviceInsertData,
    serviceUpdateData,
    serviceDeleteData,
    serviceUserLogin
}