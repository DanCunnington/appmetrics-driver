/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


var http = require('http').Server(app);
var io = require('appmetrics-ws').SocketIO(http);
http.listen(appEnv.port, function() {
    console.log("server starting on "+ appEnv.url);
});

var interval;
var memoryArray;
var iteration;
app.get('/drive', function(req,res,next) {
    var timingInterval = 1; // 1 seconds
    memoryArray=[];
    iteration=0;


    startIncrease();

    res.sendStatus(200);

    function startIncrease() {
      interval = setInterval(
          function() {
            iteration += 100;
            var x={y:99999999999999999999999999999 + iteration};
            var x1={y:99999999999999999999999999999 + iteration};
            var x2={y:99999999999999999999999999999 + iteration};
            var x3={y:99999999999999999999999999999 + iteration};
            var x4={y:99999999999999999999999999999 + iteration};
            var x5={a:x,b:x1,c:x2,d:x3,e:x4}
            memoryArray.push(x5);
            global.gc();
          }, timingInterval);
    }
});

app.get('/stop', function(req,res,next) {
  clearInterval(interval);
  memoryArray = [];
  iteration = 0;
  res.sendStatus(200);
});