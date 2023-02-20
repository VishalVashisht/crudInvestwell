const express = require("express");
const path = require("path");
const router = express.Router();
const {showForm, controlFetchData,controlInsertData,controlUpdateData,controlDeleteData,controlUserLogin} = require("../controller/userController.js")
const {signUpValidate, loginValidate, updateValidate} = require("../validation/validation.js");
var bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended:true }));

// rendering html
router.get("/",showForm);

// fetching the whole data
router.get("/user/fetch", controlFetchData);

// inserting new user
router.post("/user/insert",signUpValidate, controlInsertData);

// updating data
router.post("/user/update",updateValidate, controlUpdateData);

// delete data
router.post("/user/delete", controlDeleteData);

// login
router.post("/user/login", loginValidate, controlUserLogin);

module.exports = router;