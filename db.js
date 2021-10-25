const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/Reactcrud',(err)=>{
    if(!err){
        console.log("Mongodb connection succeeded")
    }
    else{
        console.log("Error in db connection:" +JSON.stringify(err,undefined,2))
        // err enna object string ayit convert akum with intentation of 2 space character
    }

})

module.exports=mongoose;