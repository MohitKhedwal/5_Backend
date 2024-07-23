import { v2 } from "cloudinary";
import fs from "fs"; // file system
// import { configDotenv } from "dotenv";
 import { configDotenv } from "dotenv";
 configDotenv({
     path:"./.env"
 })


v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image
const uploadCloudniary = async (localfilePath) => {
 try{
    if (!localfilePath) {
        return null; // if there is no file then return null
      }
      // upload file
      const result = await v2.uploader.upload(
        localfilePath,
        { resource_type: "auto" }, // detect file type by yourself
      );

      // console.log("File is UPLOADED",result.url)
      fs.unlinkSync(localfilePath)
      // console.log(result)
      return result
 }catch(e){
    fs.unlinkSync(localfilePath)// delete the file if uplaod failed
     return null;
  }
};


export { uploadCloudniary}

// {
//   asset_id: '5aa9c0cda92fbc3effa5e3c6b2288449',
//   public_id: 'oo1gmrueru603eyobnjj',
//   version: 1721622422,
//   version_id: '4bfdcbc25caa0ad46713ed98046d678d',
//   signature: 'f82842edd41993e848f9e1f966a2f956f2064f76',
//   width: 270,
//   height: 187,
//   format: 'jpg',
//   resource_type: 'image',
//   created_at: '2024-07-22T04:27:02Z',
//   tags: [],
//   bytes: 18295,
//   type: 'upload',
//   etag: '16cb532877bd2f6ff8cedfdbeb5d11d9',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dpxnh3luc/image/upload/v1721622422/oo1gmrueru603eyobnjj.jpg',
//   secure_url: 'https://res.cloudinary.com/dpxnh3luc/image/upload/v1721622422/oo1gmrueru603eyobnjj.jpg',
//   asset_folder: '',
//   display_name: 'oo1gmrueru603eyobnjj',
//   original_filename: '1721622417513-p2',
//   api_key: ''
// }
// {
//   _id: new ObjectId('669ddf93a3971d146b755d94'),
//   username: 'evil',
//   avatar: 'http://res.cloudinary.com/dpxnh3luc/image/upload/v1721622421/padkr6vfkeahpwwmb48u.jpg',
//   coverImage: 'http://res.cloudinary.com/dpxnh3luc/image/upload/v1721622422/oo1gmrueru603eyobnjj.jpg',
//   watchHistory: [],
//   watchLater: [],
//   createdAt: 2024-07-22T04:26:59.864Z,
//   updatedAt: 2024-07-22T04:26:59.864Z,
//   __v: 0
// }



