const express = require("express");
const path = require("path");
const router = express.Router();
const {showForm, controlFetchData,controlInsertData,controlUpdateData,controlDeleteData,controlUserLogin} = require("../controller/userController.js")
var bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended:true }));

// rendering html
router.get("/",showForm);

// fetching the whole data
router.get("/user/fetch", controlFetchData);

// inserting new user
router.post("/user/insert", controlInsertData);

// updating data
router.post("/user/update", controlUpdateData);

// delete data
router.post("/user/delete", controlDeleteData);

// login
router.post("/user/login", controlUserLogin);

module.exports = router;