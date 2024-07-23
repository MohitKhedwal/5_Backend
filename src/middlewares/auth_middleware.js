// to see if user is already there is user
// i will check if there is a token
import jwt from "jsonwebtoken"
import { apiError } from "../utilis/apiError";
import { asyncHandler } from "../utilis/asyncHandler";
import { configDotenv } from "dotenv";
import { User } from "../models/user.models.js";


configDotenv({
    path:"./.env"
})

// used to see if peroson is logged in 
export const verifyJWT = asyncHandler(async (req, res, next) => {
  
//S1// take the token  
 try {
       const token =
       req.cookies?.accessToken ||
       req.header("Authorization")?.replace("Bearer", ""); // take header and convert into cookie
     // see if their is a  cookie and take it
     // there might be situation we does not have cookie we have haeder in case of mobile
   
     if(!token){
       throw new apiError(401,"unauthoried request")
     }
   //S2  // verify the token 
   // decode it 
    const decodeToken =jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET)
    
    const user = await User.findById(decodeToken?._id).select("-password -refreshToken")
    if(!user){
       throw new apiError(401,"unauthoried request")
    }
   req.user=user; // take the user and pass
   next()
   
 } catch (error) {
    throw new apiError(401,"unauthoried request")
    
  }
});
