import { Router } from "express";
import express from "express";
import {loginUser, logoutUser, registerUser} from "../contoller/user_controller.js";
import {uploadMulter} from "../middlewares/multer_middleware.js"
const router =Router()
// const app=express()
//  Now after users anywhere the person want to go it will go from this route

router.route("/register").post(
    uploadMulter.fields([
        // takes 2 file avatar ,coverimage
        {name:"avatar",maxCount:1},
        {name:"coverImage",maxCount:1}
    ]), // fields take different ype of files
    registerUser)
// router.route("/path").post(method(function))
// add middleware

// now it will come from users and go to register


router.route("/login").post(loginUser)
 

 // to run a method o middlweare   before a function
//  router.route("/logout").method(middleware1,middleware2,mainfunction)
router.route("/logout").post(logoutUser)

export default router