var app = require('express')();
var io = require('socket.io').listen(app.listen(3000, function(){
  console.log('listening on *:3000');
}));

var messages_ = [];
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.emit('init messages', messages_);
  socket.on('chat message', function(msg){
	messages_.push(msg);
    io.emit('chat message', msg);
  });
});