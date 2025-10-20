const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3500;



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
  console.log("Attempting to going hello.htmml");
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
app.get(/.*/, (req, res) => {
  res.status(404).sendFile( path.join(__dirname, 'views', '404.html'));
});
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
