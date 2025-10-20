const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger,errLogger} = require('./middlewire/logEvents');

const PORT = process.env.PORT || 3500;

//Custom MiddleWire
app.use(logger);

//Built-in MiddleWire

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/',express.static(path.join(__dirname,'/public')));
app.use('/subdir',express.static(path.join(__dirname,'/public')));

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
app.use(cors(corsOptions));
//Routes
app.use('/',require('./routes/root'))
app.use('/subdir',require('./routes/subdir'))
app.use('/employees',require('./routes/api/employees'))



// 404
app.all(/.*/, (req, res) => {
  res.status(404);
  if(req.accepts('html')){
    res.sendFile( path.join(__dirname, 'views', '404.html'));

  }else if(req.accepts('json')){
    res.json({error:"404 Not Found"});

  }else{
    res.type('text').send("404 Not Found")
  }

});

app.use(errLogger);


app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
