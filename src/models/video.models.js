import mongoose,{Schema,model} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema= Schema({
videoFile:{
    type:String, // cloudinary url
    required:true,
},
thumbnail:{
    type:String,
    required:true
},
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
duration:{
    type:Number,
    required:true
},

},{
    timeStamps:true
})
videoSchema.plugin(mongooseAggregatePaginate)

export const Video= model("Video",videoSchema)