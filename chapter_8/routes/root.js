const express=require('express');
const router=express.Router();

const path = require('path');

// Home route: "/", "/index", "/index.html"
router.get(/^\/$|\/index(.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname,'..', 'views', 'index.html'));
});

// New page: "/new-page" or "/new-page.html"
router.get(/^\/new-page(.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname,'..', 'views', 'new-page.html'));
});

// Old page → redirect
router.get(/^\/old-page(.html)?$/, (req, res) => {
  res.redirect(301, '/new-page.html');
});

module.exports=router;