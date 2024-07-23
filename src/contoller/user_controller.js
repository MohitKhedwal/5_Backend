import { asyncHandler } from "../utilis/asyncHandler.js";
import { apiError } from "../utilis/apiError.js";
import { User } from "../models/user.models.js";
import { uploadCloudniary } from "../utilis/cloudniaryUpload.js";
import apiResponse from "../utilis/apiResponse.js";
import generateAccessTokenandRefreshToken from "../utilis/generateTokens.js";

// registering the user
const registerUser = asyncHandler(async (req, _ )  => {// some time res which is not used can be written as _

  // S1    //  Get user detail from frontend
  const { username, email, fullname, password } = req.body;

  // S2    // validate if we get all the data
  // if(fullname===""){
  //     throw new apiError(400,"Enter full name")
  // }

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    // some checks all the fileds
    // if there is a field   trim it and after it is empty then return true  if field is empty
    throw new apiError(400, "Please fill all the fields");
  }
  // S3    // check if the user already exists

  const existedUser = await User.findOne({
    $or: [{ username }, { email }], // $or is checked for all the values in object
  });
  if (existedUser) {
    throw new apiError(409, "User already exists");
  }
  console.log(req.body);
  // S4 //  takes images

  // now we have already taken data from json
  // to take files

  // takes file from multer
  const avatarLocalpath = req.files?.avatar[0]?.path;
  const coverImageLocalpath = req.files?.coverImage[0]?.path;

  // let coverImageLocalpath;
  // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
  //     coverImageLocalpath = req.files.coverImage[0].path
  // }
  // we dont  have avatar
  if (!avatarLocalpath) {
    throw new apiError(400, "Upload avatar file");
  }
  if (!coverImageLocalpath) {
    throw new apiError(400, "Upload Cover Image file");
  }

  //  uplaod file on cloudniary

  const avatar = await uploadCloudniary(avatarLocalpath);
  const coverImage = await uploadCloudniary(coverImageLocalpath);

  if (!avatar) {
    throw new apiError(400, "Error uploading avatar");
  }

  if (!coverImage) {
    throw new apiError(400, "Error uploading Cover Image");
  }

  // S5 // create user

  // takes time as db is other continent
  const newUser = await User.create({
    fullname,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage.url,
  });

  // S6 //  check if user created
  // if user created then send token

  // now we select what we dont want as by default
  const createdUser = await User.findById(newUser._id).select(
    "-password  -refreshTokens"
    // so we dont want password and token of the user
  ); // used to see if there is a user  and select it fields
  console.log(createdUser);
  if (!createdUser) {
    throw new apiError(500, "Something went wrong while creating User");
  }

  // S7 // return response
  const response = new apiResponse(
    200,
    createdUser,
    "User created successfully"
  );
  return response;
  // professinal way as the api ask for satus in postman
  //   return res.status(201).json({
  //     response
  //   })
});

// login the user
const loginUser = asyncHandler(async (req, res) => {
  // take email,password,username
  // check that email,username already exist if there then
  // check the password using bycrpt compare
  // if correct  then give refresh taken and access
  // send cookiee
  // if not then throw error
  //  access  token is given to use
  // refresh token is given to continue access token

  // S1 // take email ,password
  const { email, username, password } = req.body;
  if (!username && !email) {
    throw new apiError(400, "username or email is required")
}


  // S2 // imp  // check for both uername or password
  // always use this user as this is object of the user needed
  const loggedUser = await  User.findOne({
    // check for either username or password
    $or:[{ username }, { email }]
  }
  );
  if (!loggedUser) {
    throw new apiError(400, "user not found");
  }

  // S3 // check password
  // check the user.models.schema
  const checkPassword = await loggedUser.ispasswordCorrect(password);
  // now it takes the password by user and then heck from database which is already provided

  if (!checkPassword) {
    throw new apiError(401, "password is incorrect");
  }

  // S4 // generate access and refresh token
  // to generate access and refresh token we make method

  const { accessToken, refreshToken } =
    await generateAccessTokenandRefreshToken(loggedUser._id);
  // now we have access and refresh token

  // S5 // send cookiee
  // now we want what info to send to user
  // now we have old refresh token  so take user once again

  const loggedINUser = await User.findById(loggedUser._id).select(
    "-password -refreshTokens"
  );
  // above we get  user  with new refresh token

  const options = {
    httpOnly: true, // make  cookie to be modified only by server
    secure: true, // make cookie to be sent only over https
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshTokens", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: loggedINUser,
          accessToken,
          refreshToken,
        },
        "User loggeded in Successfully"
      )
    );
});

// const logoutUser = asyncHandler(async (req, res) => {
//   // now in logout we have to  we build a middleware which sees is there is a middleware or not
//   // now to check if the user is present we have already passed the method in middleware

//   // take user
//   await User.findByIdAndUpdate(
//     // req.user._id,
//     req.loggedUser._id,
//     {
//         $unset: {
//             refreshToken: 1 // this removes the field from document
//         }
//     },
//     {
//         new: true
//     }
// )
 
//   // await User.findByIdAndUpdate(
//   //   req.user._id, // take the id of user from middleware we saw that there is filed
//   //   {
//   //     $unset: {
//   //       // takes the value and replace the value in that field
//   //       refreshTokens: 1, // remove the token and logout user
//   //     }
//   //   },
//   //   {
//   //     new: true,
//   //   }
//   // );

//   const options = {
//     httpOnly: true, // make  cookie to be modified only by server
//     secure: true, // make cookie to be sent only over https
//   };
// return res
// .status(200)
// .clearCookie("accessToken",options)
// .clearCookie("refreshTokens",options)
// .json(
//   new apiResponse(200, {}, "User logged out Successfully")
// )
// });

const logoutUser = asyncHandler(async(req, res) => {
  await User.findByIdAndUpdate(
    console.log(  req.loggedUser._id),
      req.loggedUser._id,

      {
          $unset: {
              refreshTokens: 1 // this removes the field from document
          }
      },
      {
          new: true
      }
  )

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new apiResponse(200, {}, "User logged Out"))
})
export { registerUser, loginUser, logoutUser };
