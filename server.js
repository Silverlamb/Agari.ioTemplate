var express = require('express');
var app = express();
var http = require('http').createServer(app);

app.use(express.static('files'));

app.get("/", function(req, res){
    res.sendFile(__dirname + '/files/game.html');
});

http.listen(5000, function(){
    console.log('listening on *:5000');
});