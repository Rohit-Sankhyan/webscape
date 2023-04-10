const express = require("express")
const router =  express.Router()
const usercontroller = require("../controllers/userscontrol")
router.route("/").get(usercontroller.home)
router.route("/about").get(usercontroller.about)
router.route("/contact").get(usercontroller.contact)
router.route("/service").get(usercontroller.service)
router.route("/hire").get(usercontroller.hire)
router.route("/login").get(usercontroller.login)
router.route("/signup").get(usercontroller.signup)


module.exports= router 

