'use strict';

//----Libraries----
var express = require('express');
// var session = require('express-session');
// var bodyParser = require('body-parser');
var path = require('path');


//----Variables----
var app = express();


app.use(express.static(path.join(__dirname, 'dist'))); //

app.get("/", function(req,res) {
    res.sendFile(path.join(__dirname + '/index.html')); // Serve index.html for root URL
})

app.listen(9001, function () {
    console.log('Server starting on 9001');
});
