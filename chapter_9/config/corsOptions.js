const cors = require('cors');

//Third-Party MiddleWire
const whiteList=['https://www.google.com','https://www.yourSite.com'];
const corsOptions={
  origin:(origin,callback)=>{
    if(whiteList.indexOf(origin)!==-1 || !origin){
      callback(null,true);
    }else{
      callback(new Error("Not Allowed by CORS"))
    }
  },
  optionsSuccessStatus:200
}

module.exports=corsOptions;