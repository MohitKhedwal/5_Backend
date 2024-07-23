// it is used to standardired the error code 
//  in this method we extends the 

class apiError extends Error{

    constructor(
            status,// takes status of eror
            message="Something went wrong",// enter the message for error 
            error=[],// contains all error in array
            stack=""
    ){
        super(message);// it is used to pass the message to the error
       this.status=status
       this.message=message
       this.data=null //?
       this.error=error
       this.success=false // making the success as false

       if(stack){ // if stack is there 
        this.stack=stack
       }else{
        Error.captureStackTrace(this,this.constructor)
       }
    }
}

export { apiError}