const { resolve } = require("path");
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
    const query = `insert into users (fname, lname, phone, gender, email, pass) values ("${firstName}", "${lastName}", "${phone}", "${gender}", "${email}", "${password}")`;
    return insertData(query);
}

const serviceUpdateData = (updateUser) => {
    const query = `update users set fname="${updateUser.firstName}",
    lname="${updateUser.lastName}",
    phone="${updateUser.phone}",
    gender="${updateUser.gender}",
    email="${updateUser.email}",
    pass="${updateUser.password}"
    where userId = "${updateUser.id}"`;
    return updateData(query);
}

const serviceDeleteData = (id) => {
    const query = `delete from users where userId = ${id}`;
    return deleteData(query);
}


const serviceUserLogin = async (details) => {
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