const { serviceFetchData, serviceInsertData, serviceUpdateData, serviceDeleteData, serviceUserLogin } = require("../services/userServices");
const path = require("path");


// sending the html file
const showForm = (req, res) => {
    console.log('HTML Called !!')
    res.sendFile(path.join(__dirname, "..", "..", '/frontend/index.html'));
}

// fetching all data from database
const controlFetchData = async (req, res) => {
    const t = await serviceFetchData();
    res.send(t);

}

// inserting new user
const controlInsertData = (req, res) => {
    console.log("Post Called !!", req.body);
    const newUser = req.body;
    return serviceInsertData(newUser);
}


const controlUpdateData = (req, res) => {
    // console.log(req.body, "shaktiman vishal")
    const updateUserData = req.body;
    return serviceUpdateData(updateUserData);
}

const controlDeleteData = (req, res) => {
    const id = req.body.id;
    return serviceDeleteData(id);
}

const controlUserLogin = async (req, res) => {
    const details = req.body;
    console.log(details);
    const result = await serviceUserLogin(details);
    if (result.length == 0) {
        res.send("No user found!!");
    }
    else if (result[0].pass === details.password) {
        res.send(result[0]);
    }
    else {
        res.send("Incorrect password!!");
    }
}



module.exports = {
    showForm,
    controlFetchData,
    controlInsertData,
    controlUpdateData,
    controlDeleteData,
    controlUserLogin
}