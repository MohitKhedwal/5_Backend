import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app=express()

app.use(cors({ // origin allowed
      origin:process.env.CORS_ORIGIN,
      credentials:true
}))

app.use(express.json({limit:"16kb"})) // amount of data allowed

app.use(express.urlencoded({ //  take data from url
    extended:true,
    limit:"16kb"
}))

app.use(express.static("public")) // used to make  folder which is used  a folder whic is used to store img,assest etc

app.use(cookieParser()) // used to take and set cookie from server  to user browser 


// import routes
import  userrouter from "./routes/user_routes.js"


// routs making
app.use("/api/v1/users",userrouter);
// app.post('/users', 
//     (req, res) => {
//         res.status(200).json({ message: "ok" });
//        }
//   )
// when we use api we write it as https:localhost:5000/api/v1/users
// helps us to keep code clean
export {app}