var express = require('express')
var app = express.createServer();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname));

var io = require('socket.io').listen(app);

io.configure(function () {  
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

app.listen(app.get('port'), function(){
  console.log('listening on ' + app.get('port'));
});

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
