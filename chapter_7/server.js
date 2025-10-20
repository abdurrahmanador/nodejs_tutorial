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
app.use(express.static(path.join(__dirname,'/public')));

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


// Home route: "/", "/index", "/index.html"
app.get(/^\/$|\/index(.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// New page: "/new-page" or "/new-page.html"
app.get(/^\/new-page(.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

// Old page → redirect
app.get(/^\/old-page(.html)?$/, (req, res) => {
  res.redirect(301, '/new-page.html');
});

///Route Handler

app.get(/\/hello(.html)?$/,(req,res,next)=>{
  console.log("Attempting to go hello.htmml");
  next();
},(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'));

})

//Chaining Route Handler
const one=(req,res,next)=>{
  console.log('One');
  next();
}
const two=(req,res,next)=>{
  console.log('two');
  next();
}
const three=(req,res,next)=>{
  console.log('three');
  res.send("finished")
}

app.get(/\/chainRoute/,[one,two,three]);

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
