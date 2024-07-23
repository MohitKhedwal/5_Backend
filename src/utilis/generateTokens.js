import { User } from "../models/user.models.js";
import { apiError } from "./apiError.js";
import { asyncHandler } from "./asyncHandler.js";


const generateAccessTokenandRefreshToken=async(userId)=>{
    try {
      const user=await User.findById(userId);
      const accessToken=user.generateAccessToken();
      const refreshToken=user.generateRefreshToken();

      // now save the refreshtoken in db
      user.refreshToken=refreshToken;
      await user.save({validateBeforeSave:false});
      // now we dont want to check whole databsee as it is saved

      return  {accessToken,refreshToken}
  
      
    } catch (error) {
      throw new apiError(500,"Something went wrong while Token generation")
    }
  }

  export default generateAccessTokenandRefreshToken