var express = require('express');
var app = express();
app.use(express.static(__dirname));

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
	
server.listen(process.env.PORT || 3000);


var messages_ = [];
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
	socket.emit('init messages', messages_);
	socket.on('chat message', function(msg){
	messages_.push(msg);
	io.emit('chat message', msg);
	});
});
