'use strict';

//----Libraries----
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cfenv = require('cfenv');


//----Variables----
var app = express();
var appEnv = cfenv.getAppEnv();


//----Routes----
app.use(express.static(path.join(__dirname, 'dist'))); //
app.use('/app', express.static('./src/app'));
app.use('/node_modules', express.static('./node_modules'));

app.get("/", function(req,res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(appEnv.port, function () {
    console.log('Server starting on ' + appEnv.url);
});
