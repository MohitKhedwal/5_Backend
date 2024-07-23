// const asyncHandler=(requestHandler)=>{
//     return  (req ,res,next)=>{ // taking function and passing res,rej,next
//     Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
//     }}


// ab har baar har ek function ko try catch aur dekhna ki vo reslove hua hai ki nhi usse bachne ke liye apan ne ye higher order function banaya hai


    const asyncHandler = (requestHandler) => {
        return async (req, res, next) => {
          try {
            await Promise.resolve(requestHandler(req, res, next));
          } catch (err) {
            next(err);
          }
        };
      };






// const asyncHandler=(fn)=>{}
// const asyncHandler=(fn)=>{(res,next,rej)=>{}}

// const asyncHandler=(fn)=async(res,rej,next)=>{
//     // for try catch
//     try{
//       await fn(res,rej,next) // taking response
//     }catch(err){
//     res.status(err.code || 500).json({ // taking response and seeing it if any error occurs and taking json response
//       success:false,
//       message:err.message

//     })
//     }
// }

export {asyncHandler}